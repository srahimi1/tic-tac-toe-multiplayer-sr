# Mutiplayer, networked Tic-Tac-Toe game

This is a two-player tic-tac-toe game where two players, on two different computers, can play against each other.

This networked, multi-player tic-tac-toe game uses **_Server-sent events (SSEs)_**, initially called from within a **_web-worker_**, to send updated game data from the server to the front-end clients.

The **_web-worker_** is used to prevent possible delays and interruptions in the main javascript event loop. 

local storage in the form of **_sessionStorage_** is used to keep track of gameID, userID, and game piece (i.e. chosen letter), of the current user.

Bootstrap CSS and JavaScript libraries were used to create the modals and style the buttons.

### To Play:

To start a new game, click on the "Start a new game" button. A modal will appear asking for your choice of game piece (X or O). After choosing, the game board will appear with the game ID at the top. This ID is needed by the second player to join the game. To play against another player, the second player should click on the "Join a game button" and enter the ID at the top of the game board of the first player.
