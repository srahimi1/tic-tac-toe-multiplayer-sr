var gameID = "";

onmessage = function(event) {
	gameID = event.data;
	console.log("gameID in worker "+ gameID);
	getData();
}


function getData() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log("worker response "+ request.responseText);
			postMessage(request.responseText);
			getData();
		}

	} // end onreadystatechange
	request.open("get","/games/"+gameID);
	request.send();
}