var gameID = "", player = "", event1;

onmessage = function(event) {
	if (event.data == 0) {
		getData(0);
	}
	else {
	data = event.data.split(",");
	gameID = data[0];
	player = data[1];	
	event1 = new EventSource("/games/"+gameID+"?player="+player);
	getData(1); }
}


function getData(code) {
	if (code == 0) {
		event1.close();
		close();
	}
	else if (code == 1) {
		event1.onmessage = function(event) {
			postMessage(event.data);
		}	
	}

}