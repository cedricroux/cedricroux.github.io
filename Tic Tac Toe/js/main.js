$(document).ready(function () {
  $("#submitName").on("click", function () {
    player1Name = $("#player1Input").val();
    player2Name = $("#player2Input").val();
    $("#scorePlayer1Name").html(player1Name + " wins: ");
    $("#scorePlayer2Name").html(player2Name + " wins: ");
  });

  $("#restartButton").click(function () {
    startGame();
    $("#player1Name").html("");
    $("#player2Name").html("");
    $("#scorePlayer1Name").empty();
    $("#scorePlayer2Name").empty();
  });

  $("#resetButton").click(function () {
    startGame();
  });
});



var finish = function (p, highlight) {
  if (typeof p != "undefined") {
    $("#status").text(p + " is the winner!");

  } else {
    $("#status").text("The game ended with a draw.");
  }
  turn = "";
  if (typeof hightlight != "undefined") {
    highlightWinner(highlight);
  }
  if (p == "X") xwins++;
  else if (p == "O") owins++;
  $("#xwins").text(xwins);
  $("#owins").text(xwins);
};

var keepScore = 0;
var player1Score = 0;
var player2Score = 0;

// Tells us who's turn it is.
var startGame = function () {
  // Clears the game.
  for (var i = 1; i <= 9; i += 1) {
    clearBox(i);
  }

  // Randomize who gets to start.
  if (Math.random() < 0.5) {
    document.turn = "O";
  } else {
    document.turn = "X";
  }
  document.winner = false;
  setMessage(document.turn + " gets to start.");
};

//
var setMessage = function (msg) {
  document.getElementById("message").innerText = msg;
};

// Let's the player move if square is free.
var nextMove = function (square) {
  if (document.winner != false) {
    setMessage(document.winner + " already won the game.");
  } else if (square.innerText == "") {
    square.innerText = document.turn;
    switchTurn();
  } else {
    setMessage("That square is already used.");
  }
};

// Changes the current user's turn. Checks for winner.
var switchTurn = function () {
  if (checkForWinner(document.turn)) {
    setMessage("Congratulations, " + document.turn + "! You win!");
    document.winner = document.turn;
  } else if (document.turn == "X") {
    document.turn = "O";
    setMessage("It's " + player2Name + "'s turn!");
  } else {
    document.turn = "X";
    setMessage("It's " + player1Name + "'s turn!");
  }
};

// Checks all the possible ways a user can win.
var checkForWinner = function (move) {
  var result = false;
  if (checkRow(1, 2, 3, move) ||
  checkRow(4, 5, 6, move) ||
  checkRow(7, 8, 9, move) ||
  checkRow(1, 4, 7, move) ||
  checkRow(2, 5, 8, move) ||
  checkRow(3, 6, 9, move) ||
  checkRow(1, 5, 9, move) ||
  checkRow(3, 5, 7, move))
  {
    result = true;
  }
  return result;
};

// Calls on three squares for later comparison.
var checkRow = function (a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
};

//
var getBox = function (number) {
  return document.getElementById("s" + number).innerText;
};

//
var clearBox = function (number) {
  document.getElementById("s" + number).innerText = "";
};
