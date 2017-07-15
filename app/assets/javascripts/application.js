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

var blocked = 0, w, gameBody, gameBoardNew;

window.onload = function() {
	gameBody = $("#game-body").html();
	gameBoardNew = $("#gameBoardTemplate").html();
}

// reveals the input box to enter the game ID for the game the user wants to join. Only used to join a game, not
// create a new game.
function revealP(){
	$("#gameIDInputP").slideDown();
}

function startNewGame() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var gameID = request.responseText;
			console.log("game ID from server response is: "+gameID);
			sessionStorage.setItem("gameID", gameID);
			sessionStorage.setItem("player", "1");
			$("#myModalLabel").html("Game ID: "+gameID);
			$("#gameModal").modal("show");
			$("#game-body").html(gameBody);
		}

	} // end onreadystatechange
	request.open("get","/games/new");
	request.send();
} // end function startNewGame


function choosePiece(letter) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log("chosen letter from server response is: "+request.responseText);
			var letter = request.responseText;
			sessionStorage.setItem("letter",letter);
			console.log("letter stored in session is: "+sessionStorage.letter);
			setupGameBoard();
		}

	} // end onreadystatechange
	request.open("put","/games/"+sessionStorage.gameID+"?letter="+letter);
	request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
	request.send();
}

function setupGameBoard() {
	blocked = 0;
	$("#game-body").html(gameBoardNew);
	$("#gameBoardTemplate2").slideDown();
	startWorker(1);
}


function clicked(rowcol) {
	if (!blocked) {
		blocked = 1;
		var cell = document.getElementById(""+rowcol+"");
		cell.className = "clicked";
		cell.innerHTML = sessionStorage.letter;
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				console.log(request.responseText);
				$("#status").html("waiting for other player ...");
			}

		} // end onreadystatechange
		request.open("get","/games/play/"+sessionStorage.gameID+"?rowcol="+rowcol+"&letter="+sessionStorage.letter);
		request.setRequestHeader("X-CSRF-Token",document.getElementsByTagName("meta")[1].getAttribute("content"));
		request.send(); 
	}
}

function updateGameBoard(data) {
	var data2 = data + "";
	var data3 = data2.split("w1");
	var winner = data3[1];
	var boardData = data3[0].split(" ");
	for (i=0; i<boardData.length; i++) {
		var data4 = boardData[i].split(",");
		var cellID = data4[0];
		var letter = data4[1];
		var cell = document.getElementById(cellID);
		cell.onclick = function() {alert("already taken");}
		if ((winner != "Z") || (boardData.length >=9)) {
			$("#status").html("Game Over");
			cell.className = "clicked";
			cell.innerHTML = letter;
			blocked = 1;
			startWorker(0);
			if (winner != "Z") {
				$("#gameWonModal").modal("show");
				$("#game-winner").html(winner);
			}
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
			$("#gameModal").modal("show");
			$("#myModalLabel").html("Game ID: "+gameID);
			response = request.responseText + "";
			data = response.split("data: ");
			sessionStorage.setItem("letter", data[1].split("q")[1]);
			console.log("letter is "+ sessionStorage.letter);
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
			if (response[2].length > 3) updateGameBoard(response[2]);
	}}
	else {
		w.postMessage(0);
	}
} // end function startWorker()

function stopGame() {
	startWorker(0);
}