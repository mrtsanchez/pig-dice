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

Player.prototype.stats = function() {
  return [this.rolls, this.holds, this.ones];
}

function getRandom() {
  var roll = 1 + Math.floor(Math.random() * 6);
  return roll;
};

function rollDie(_activeTurn, _inactiveTurn){
  var roll = getRandom();
  if (_activeTurn === player1) {
    i = "player1";
    j = "player2";
  } else {
    i = "player2";
    j = "player1";
  }
  $(".dice-image").hide();
  $("#roll-image-"+i).append("<img src='img/dice" + roll.toString() + ".png' class='img-responsive dice-image'>");
  _activeTurn.rolls += 1;
  _activeTurn.turnScore += roll;
  if (_activeTurn.playerScore + _activeTurn.turnScore < 50){
    if (roll !== 1){
    } else {
      _activeTurn.turnScore = 0;
      _activeTurn.ones += 1;
      changeFromTo(_activeTurn, _inactiveTurn)
    }
  } else {
    endGame(_activeTurn.playerName, _inactiveTurn.playerName);
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

  $(".dice-image").hide();

  $("#roll" + i).addClass("button-disable");
  $("#hold" + i).addClass("button-disable");
  $("#panel-player" + i).addClass("panel-disable");
  $("#roll" + j).removeClass("button-disable");
  $("#hold" + j).removeClass("button-disable");
  $("#panel-player" + j).removeClass("panel-disable");
  turns ++;

  if (_inactiveTurn.playerName === "Light Blue") {
    computerTurnEasy();
  }
  else if (_inactiveTurn.playerName === "Deep Blue") {
    computerTurnHard();
  }
};

function holdDie(_activeTurn, _inactiveTurn) {
  _activeTurn.holds += 1;
  _activeTurn.playerScore += _activeTurn.turnScore;
  _activeTurn.turnScore = 0;
  changeFromTo(_activeTurn, _inactiveTurn);
};

function endGame(winner, loser) {
  $(".game-screen").hide();
  $(".footer").hide();
  $(".results-screen").show();
  $(".winner").text(winner);
  $(".loser").text(loser);


  for(i =0;i<=2;i++){
    $(".player1-stats"+i.toString()).text((player1.stats())[i]);
  };

  for(i =0;i<=2;i++){
    $(".player2-stats"+i.toString()).text((player2.stats())[i]);
  };

  for(i =1;i<3;i++){
    if((player1.stats())[i] > (player2.stats())[i]){
      $("#stat-winner"+i.toString()).text(player1.playerName);
      $("#stat-loser"+i.toString()).text(player2.playerName);
      $("#more"+i.toString()).text((player1.stats())[i]);
      $("#less"+i.toString()).text((player2.stats())[i]);
    } else if ((player1.stats())[i] < (player2.stats())[i]) {
      $("#stat-winner"+i.toString()).text(player2.playerName);
      $("#stat-loser"+i.toString()).text(player1.playerName);
      $("#less"+i.toString()).text((player1.stats())[i]);
      $("#more"+i.toString()).text((player2.stats())[i]);
    } else {
      $("#results"+i.toString()).hide();
    }
  }
};

function computerTurnEasy() {

  rollDie(player2, player1);

  if (player2.turnScore === 0){
    changeFromTo(player2, player1)
  } else {
    $(".turn-score2").text(player2.turnScore);
      setTimeout(function (){
        rollDie(player2, player1);
        if (player2.turnScore === 0){
          changeFromTo(player2, player1)
          $(".turn-score2").text(player2.turnScore);
        } else {
          $(".turn-score2").text(player2.turnScore);
          setTimeout(function (){
            holdDie(player2, player1)
            $(".turn-score2").text(player2.turnScore);
            $(".total-score2").text(player2.playerScore);
          }, 2000);
        }
      }, 2000);
  }
};

function computerTurnHard() {

  rollDie(player2, player1);

  if (player2.turnScore === 0){
    changeFromTo(player2, player1)
  } else if (player2.turnScore < ((100-player2.playerScore)/(100-player1.playerScore))*10) {
    $(".turn-score2").text(player2.turnScore);
      setTimeout(function (){
        computerTurnHard()}, 2000);
  } else {
      $(".turn-score2").text(player2.turnScore);
      setTimeout(function (){
        holdDie(player2, player1)
        $(".turn-score2").text(player2.turnScore);
        $(".total-score2").text(player2.playerScore);
      }, 2000);
  }
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

  $("#playAgain").click(function(){
    location.reload();

  });

});
