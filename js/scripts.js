// business logic

function getRandom() {
  var roll = 1 + Math.floor(Math.random() * 6);
  return roll;
};

function Player () {
  this.playerScore = 0;
  this.turnScore = 0;
  this.playerName = 0;
  this.holds = 0;
  this.ones = 0;
  this.rolls = 0;
};

var player1 = new Player ();
var player2 = new Player ();

var turns = 1;

function changeFromTo(i,j){
    $("#roll" + i.toString()).addClass("button-disable");
    $("#hold" + i.toString()).addClass("button-disable");
    $("#roll" + j.toString()).removeClass("button-disable");
    $("#hold" + j.toString()).removeClass("button-disable");
    turns ++;
};

function endGame(turn, total, winner, loser) {

  if ((turn + total) >= 12) {

    $(".game").hide();
    $(".game-over").show();
    $(".winner").text(winner);
    $(".loser").text(loser);
    $(".player1").text(player1.playerName);
    $(".player2").text(player2.playerName);
    $("#turn").text(turns);
    $("#player1-rolls").text(player1.rolls);
    $("#player2-rolls").text(player2.rolls);
    $("#player1-ones").text(player1.ones);
    $("#player2-ones").text(player2.ones);
    $("#player1-holds").text(player1.holds);
    $("#player2-holds").text(player2.holds);

    if (player1.holds > player2.holds) {
      moreHolds = player1;
      lessHolds = player2;
    } else {
      moreHolds = player2;
      lessHolds = player1;
    }
    $("#moreHolder").text(moreHolds.playerName);
    $("#lessHolder").text(lessHolds.playerName);
    $("#moreHoldsNum").text(moreHolds.holds);
    $("#lessHoldsNum").text(lessHolds.holds);

    if (player1.ones > player2.ones) {
      $("#player-ones").text("Sorry " + player1.playerName + "you get " + player1.ones + "in this game, blah blah");
    } else {

    }
  }
};

//frontend logic

$(document).ready(function() {

  $("#names").submit(function(event){

    event.preventDefault();

    player1.playerName = $("#name1").val();
    player2.playerName = $("#name2").val();
    $(".welcome").hide();
    $(".game").show();
    $(".player1").text(player1.playerName);
    $(".player2").text(player2.playerName);
  });

  // player 1 turn

  $("#roll1").click(function(event){
    var roll = getRandom();
    player1.rolls += 1;
    if (roll !== 1){
      player1.turnScore += roll;
      endGame(player1.turnScore, player1.playerScore, player1.playerName, player2.playerName);
    }
    else {
      player1.turnScore = 0;
      player1.ones += 1;
      changeFromTo(1,2);
    }
    $(".turn-score1").text(player1.turnScore);
  });

  $("#hold1").click(function(event){
    player1.holds += 1;
    player1.playerScore += player1.turnScore;
    player1.turnScore = 0;
    $(".total-score1").text(player1.playerScore);
    $(".turn-score1").text(player1.turnScore);
    changeFromTo(1,2);
  });

  // player 2 turn

  $("#roll2").click(function(event){
    player2.rolls += 1;
    var roll = getRandom();

    if (roll !== 1){
      player2.turnScore += roll;
      endGame(player2.turnScore, player2.playerScore, player2.playerName, player1.playerName);
    }
    else {
      player2.turnScore = 0;
      player2.ones += 1;
      changeFromTo(2,1);
    }
    $(".turn-score2").text(player2.turnScore);

  });

  $("#hold2").click(function(event){
    player2.holds += 1;
    player2.playerScore += player2.turnScore;
    player2.turnScore = 0;
    $(".total-score2").text(player2.playerScore);
    $(".turn-score2").text(player2.turnScore);
    changeFromTo(2,1);
  });

  $("#playAgain").click(function(event){
    location.reload();

  });
});
