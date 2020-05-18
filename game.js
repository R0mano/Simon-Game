var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

$(document).on("keypress", function() {
  if (gamePattern.length === 0 ) {
    nextSequence();
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
};

$(".btn").on("click", function() {
  var userChosenColor = this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("Success!");
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
          nextSequence();
          userClickedPattern.length = 0;
        }, 1000);
      }


    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout( function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over!<br>Press Any Key to Restart.")
      startOver();
    }
  }

  function startOver() {
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;
  }


function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100)
}
