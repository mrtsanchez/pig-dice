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
var computerEasy = new Player ();
var computerHard = new Player ();

var turns = 1;
var moreHolds = 0;
var lessHolds = 0;
var moreOnes = 0;
var lessOnes = 0;

function changeFromTo(i,j){
    $(".roll" + i.toString()).addClass("button-disable");
    $(".hold" + i.toString()).addClass("button-disable");
    $(".roll" + j.toString()).removeClass("button-disable");
    $(".hold" + j.toString()).removeClass("button-disable");
    turns ++;
};

function endGame(turn, total, winner, loser) {

  if ((turn + total) >= 12) {

    $(".two-player-game").hide();
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
    } else if (player2.holds > player1.holds){
      moreHolds = player2;
      lessHolds = player1;
    } else {
      $("#holdParagraph").hide();
    }
    $("#moreHolder").text(moreHolds.playerName);
    $("#lessHolder").text(lessHolds.playerName);
    $("#moreHoldsNum").text(moreHolds.holds);
    $("#lessHoldsNum").text(lessHolds.holds);

    if (player1.ones > player2.ones) {
      moreOnes = player1;
      lessOnes = player2;
    } else if (player2.ones > player1.ones){
      moreOnes = player2;
      lessOnes = player1;
    } else {
        $("#onesParagraph").hide();
    }
    $("#moreOnes").text(moreOnes.playerName);
    $("#lessOnes").text(lessOnes.playerName);
    $("#moreOnesNum").text(moreOnes.ones);
    $("#lessOnesNum").text(lessOnes.ones);
  };
};



function rollDie(user1, user2){
  var roll = getRandom();
  user1.rolls += 1;
  if (roll !== 1){
    user1.turnScore += roll;
    endGame(user1.turnScore, user1.playerScore, user1.playerName, user2.playerName);
  }
  else {
    user1.turnScore = 0;
    user1.ones += 1;
    if (user2 === player2) {
      changeFromTo(1,2);
    } else if (user2 === player1) {
      changeFromTo(2,1);
    } else if (user2 === computerEasy) {
      computerTurnEasy();
    } else if (user2 === computerHard) {
      computerTurnHard();
    }
  }
};


function holdDie(user1, user2) {
  user1.holds += 1;
  user1.playerScore += user1.turnScore;
  user1.turnScore = 0;
};

function computerTurnEasy() {
  for (var i = 1; i <= 2; i++) {
    rollDie(computerEasy, player1);
    if (computerEasy.turnScore === 0) {
      break;
    }
    else {
      holdDie(computerEasy, player1)
    }
  };
  rollDie(computerEasy, player1);
  if (computerEasy.turnScore !== 0) {
    rollDie(computerEasy, player1);
  }
  else {
    changeFromTo (2,1);
  }
  computerEasy.playerScore += computerEasy.turnScore;
  computerEasy.turnScore = 0;
};


function computerTurnHard() {


};

//frontend logic

$(document).ready(function() {

  $("#two-players").click(function(){
    $(".welcome").hide();
    $(".players").show();
  });

  $("#one-player").click(function(){
    $(".welcome").hide();
    $(".player").show();
  });

  // Human vs Computer

  $("#name").submit(function(event){
    event.preventDefault();
    $(".player").hide();
    $(".one-player-game").show();
    player1.playerName = $(".name").val();
    computerEasy.playerName = "Light Blue";
    $(".player1").text(player1.playerName);
    $(".computer").text(computerEasy.playerName);


    $(".roll1").click(function(){
      rollDie(player1, computerEasy)
      $(".turn-score1").text(player1.turnScore);
    });

    $(".hold1").click(function(){
      holdDie(player1, computerEasy);
      $(".total-score1").text(player1.playerScore);
      $(".turn-score1").text(player1.turnScore);
      changeFromTo(1,2);
      computerTurnEasy();
    });






  });

  // Two Players

  $("#names").submit(function(event){

    event.preventDefault();

    player1.playerName = $(".name1").val();
    player2.playerName = $("#name2").val();
    $(".players").hide();
    $(".two-player-game").show();
    $(".player1").text(player1.playerName);
    $(".player2").text(player2.playerName);
    $(".roll2").addClass("button-disable");
    $(".hold2").addClass("button-disable");
  });

  // player 1 turn

  $(".roll1").click(function(){
    rollDie(player1,player2)
    $(".turn-score1").text(player1.turnScore);
  });

  $(".hold1").click(function(){
    holdDie(player1, player2);
    $(".total-score1").text(player1.playerScore);
    $(".turn-score1").text(player1.turnScore);
    changeFromTo(1,2);
  });

  // player 2 turn

  $(".roll2").click(function(){
    rollDie(player2, player1)
    $(".turn-score2").text(player2.turnScore);

  });

  $(".hold2").click(function(){
    holdDie(player2, player1);
    $(".total-score2").text(player2.playerScore);
    $(".turn-score2").text(player2.turnScore);
    changeFromTo(2,1);
  });

  $("#playAgain").click(function(){
    location.reload();

  });
});
