# Mutiplayer, networked Tic-Tac-Toe game

This is a two-player tic-tac-toe game where two players, on two different computers, can play against each other.

This networked, mutliplayer tic tac toe game uses Server-side events (SSEs), called from with-in a web-worker, to poll server data for updates to a particular game in progress.

A web-worker is used to allow a continual running of a javascript script without stalling the main javascript thread. 

local storage in the form of sessionStorage is used to keep track of gameID, userID, and game piece (i.e. chosen letter), of the current user.

