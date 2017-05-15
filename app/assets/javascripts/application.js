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


function revealP(){
	$("#gameIDInputP").slideDown();
}

function startNewGame() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var gameID = request.responseText;
			sessionStorage.setItem("gameID", gameID);
			sessionStorage.setItem("userID", "A");
			console.log("gameID: "+sessionStorage.gameID);
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
	startWorker();
}


function clicked(rowcol) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.responseText);
			updateGameBoard(request.responseText);
		}

	} // end onreadystatechange
	request.open("get","/games/play/"+sessionStorage.gameID+"?rowcol="+rowcol+"&letter="+sessionStorage.letter);
	request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
	request.send();
}

function updateGameBoard(data) {
	var data2 = data + "";
	var boardData = data2.split(" ");
	for (i=0; i<boardData.length; i++) {
		var data3 = boardData[i].split(",");
		var cellID = data3[0];
		var letter = data3[1];
		document.getElementById(cellID).className = "clicked";
		document.getElementById(cellID).innerHTML = letter;
	
	}
}

function joinGame() {
	var gameID = document.getElementById("gameIDInput").value;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var response = request.responseText + "";
			response = response.split("q");
			sessionStorage.setItem("gameID",response[0]);
			sessionStorage.setItem("letter",response[1]);
			$("#myModalLabel").html("Game ID: "+gameID);
			$("#gameModal").modal("show");
			setupGameBoard();
			updateGameBoard(response[2]);
			startWorker();
		}

	} // end onreadystatechange
	request.open("get","/games/"+gameID);
	request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
	request.send();
}

function startWorker() {
	var w = new Worker("/javascripts/getBoardData.js");
	w.postMessage(sessionStorage.gameID);
	w.onmessage = function(event) {
		data = event.data + "";
		response = data.split("q");
		if (response[2]) updateGameBoard(response[2]);
	}
} // end function startWorker()