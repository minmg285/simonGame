// jshint esversion : 6
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
const keybind = {
    q:"green",
    w:"red",
    e:"yellow",
    r:"blue"

};

const hotkey = (key) =>{

    playSound(keybind[key]);
    animatePress(keybind[key]);

};

$(document).keypress(function(e) {
    console.log(e.key);
    if(e.key==="Enter"){
        started=true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }else if(started){
        if(keybind.hasOwnProperty(e.key)){
            userClickedPattern.push(keybind[e.key]);
            hotkey(e.key);
            checkAnswer(userClickedPattern.length-1);
        }
    }else if(keybind.hasOwnProperty(e.key)){
        hotkey(e.key);
    }
    
    
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  if(started){
    checkAnswer(userClickedPattern.length-1);
  }
});

const checkAnswer= (currentLevel)=> {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Enter to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
};


const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};
const animatePress = (currentColor)=> {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

const playSound= (name) => {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
