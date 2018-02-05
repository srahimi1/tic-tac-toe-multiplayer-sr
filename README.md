# Mutiplayer, networked Tic-Tac-Toe game

This is a two-player tic-tac-toe game where two players, on two different computers, can play against each other.

This networked, mutliplayer tic tac toe game uses **_Server-side events (SSEs)_**, called from with-in a **_web-worker_**, to poll server data for updates to a particular game in progress.

A **_web-worker_** is used to allow a continual running of a javascript script without stalling the main javascript thread. 

local storage in the form of **_sessionStorage_** is used to keep track of gameID, userID, and game piece (i.e. chosen letter), of the current user.

Bootstrap was used to create the modals, and the 

To start a new game, click on the "Start a new game" button. A modal will appear asking for your choice of game piece (X or O). After choosing, the game board will appear with the game ID at the top. This ID is needed by the second player to join the game. To play against another player, the second player should click on the "Join a game button" and enter the ID at the top of the game board of the first player.
