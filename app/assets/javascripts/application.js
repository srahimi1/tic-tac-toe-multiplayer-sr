// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require turbolinks
//= require_tree .

var blocked = 0, w;

function revealP(){
	$("#gameIDInputP").slideDown();
}

function startNewGame() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var gameID = request.responseText;
			sessionStorage.setItem("gameID", gameID);
			sessionStorage.setItem("player", "1");
			$("#myModalLabel").html("Game ID: "+gameID);
			$("#gameModal").modal("show");
		}

	} // end onreadystatechange
	request.open("get","/games/new");
	request.send();
} // end function startNewGame


function choosePiece(letter) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			sessionStorage.setItem("letter",letter);
			setupGameBoard();
		}

	} // end onreadystatechange
	request.open("put","/games/"+sessionStorage.gameID+"?letter="+letter);
	request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
	request.send();
}

function setupGameBoard() {
	var html = $("#gameBoardTemplate").html();
	$("#game-body").html(html);
	$("#gameBoardTemplate2").slideDown();
	startWorker(1);
}


function clicked(rowcol) {
	if (!blocked) {
	blocked = 1;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			$("#status").html("waiting for other player ...");
		}

	} // end onreadystatechange
	request.open("get","/games/play/"+sessionStorage.gameID+"?rowcol="+rowcol+"&letter="+sessionStorage.letter);
	request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
	request.send(); }
}

function updateGameBoard(data) {
	var data2 = data + "";
	var boardData = data2.split(" ");
	for (i=0; i<boardData.length; i++) {
		var data3 = boardData[i].split(",");
		var cellID = data3[0];
		var letter = data3[1];
		var cell = document.getElementById(cellID);
		cell.onclick = function() {alert("already taken");}
		if (boardData.length >=9) {
			$("#status").html("Game Over");
			cell.className = "clicked";
			cell.innerHTML = letter;
			blocked = 1;
			startWorker(0);
		}
		else if ((cell.innerHTML == "") && (letter == sessionStorage.letter)) {
			cell.className = "clicked";
			cell.innerHTML = letter;
			blocked = 1;
		}
		else if ((cell.innerHTML == "") && (sessionStorage.letter)) {
			cell.className = "clicked";
			cell.innerHTML = letter;
			blocked = 0;
			$("#status").html("Go");
		}
		
	}
}

function joinGame() {
	var gameID = document.getElementById("gameIDInput").value;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			sessionStorage.setItem("gameID",gameID);
			sessionStorage.setItem("player", "2");
			$("#myModalLabel").html("Game ID: "+gameID);
			$("#gameModal").modal("show");
			setupGameBoard();
		}

	} // end onreadystatechange
	request.open("get","/games/"+gameID);
	request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
	request.send();
}

function startWorker(code) {
	if (code == 1) {
		w = new Worker("/javascripts/getBoardData.js");
		w.postMessage(sessionStorage.gameID+","+sessionStorage.player);
		w.onmessage = function(event) {
			data = event.data + "";
			response = data.split("q");
			sessionStorage.setItem("letter",response[1]);
			if (response[2]) updateGameBoard(response[2]);
	}}
	else {
		w.postMessage(0);
	}
} // end function startWorker()

function stopGame() {
	startWorker(0);
}