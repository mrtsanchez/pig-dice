// business logic

function Player () {
  this.playerName = 0;
  this.playerScore = 0;
  this.turnScore = 0;
  this.holds = 0;
  this.ones = 0;
  this.rolls = 0;
};

var turns = 1;
var player1 = new Player ();
var player2 = new Player ();

function getRandom() {
  var roll = 1 + Math.floor(Math.random() * 6);
  return roll;
};

function rollDie(_activeTurn, _inactiveTurn){
  var roll = getRandom();
  _activeTurn.rolls += 1;
  _activeTurn.turnScore += roll;
  if (_activeTurn.playerScore + _activeTurn.turnScore < 20){
    if (roll !== 1){
    } else {
      _activeTurn.turnScore = 0;
      _activeTurn.ones += 1;
      changeFromTo(_activeTurn, _inactiveTurn)
    }
  } else {
    endGame();
  }
};

function changeFromTo(_activeTurn,_inactiveTurn){
    if (_activeTurn === player1) {
      i = "1";
      j = "2";
    } else {
      i = "2";
      j = "1";
    }
    $("#roll" + i).addClass("button-disable");
    $("#hold" + i).addClass("button-disable");
    $("#roll" + j).removeClass("button-disable");
    $("#hold" + j).removeClass("button-disable");
    turns ++;
};

function holdDie(_activeTurn, _inactiveTurn) {
  _activeTurn.holds += 1;
  _activeTurn.playerScore += _activeTurn.turnScore;
  _activeTurn.turnScore = 0;
  changeFromTo(_activeTurn, _inactiveTurn);
};

function endGame() {
  $(".game-screen").hide();
  $(".results-screen").show();

  var stats = ["rolls", "ones", "holds"];

  i = 0

  while (i <= 2){

  }



  // statsPlayer1 = ["name", "rolls", "ones", "holds"];
  // statsPlayer1.forEach(function(_stat) {
  //   $("#player1-" + _stat).text(player1. + _stat);
  // });
  // statsPlayer2 = ["name", "rolls", "ones", "holds"];
  // statsPlayer2.forEach(function(_stat) {
  //   $("#player2-" + _stat).text(player2. + _stat);
  // });
// };


};

//front-end logic

$(document).ready(function() {

  $("#two-players").click(function(){
    $(".welcome-screen").hide();
    $(".players-screen").show();
    $(".computer-button").hide();

  });

  $("#one-player").click(function(){
    $(".welcome-screen").hide();
    $(".players-screen").show();
    $(".second-player").hide();
  });

  $("#names").submit(function(event){
    event.preventDefault();
    player1.playerName = $("#name1").val();
    if ($("#name2").val()) {
      player2.playerName = $("#name2").val();
    }
    else {
      player2.playerName = $(".computer-button").val();
    }
    $(".players-screen").hide();
    $(".game-screen").show();
    $(".player1").text(player1.playerName);
    $(".player2").text(player2.playerName);
    $(".turn-score1").text(player1.turnScore);
    $(".turn-score2").text(player2.turnScore);
    $(".total-score1").text(player1.playerScore);
    $(".total-score2").text(player2.playerScore);
  });

  $("#roll1").click(function(){
    rollDie(player1, player2);
    $(".turn-score1").text(player1.turnScore);
  });

  $("#hold1").click(function(){
    holdDie(player1, player2);
    $(".turn-score1").text(player1.turnScore);
    $(".total-score1").text(player1.playerScore);
  });

  $("#roll2").click(function(){
    rollDie(player2, player1);
    $(".turn-score2").text(player2.turnScore);
  });

  $("#hold2").click(function(){
    holdDie(player2, player1);
    $(".turn-score2").text(player2.turnScore);
    $(".total-score2").text(player2.playerScore);
  });

});
