var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

$(".btn").on("click",function(){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length-1);
});

$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(userLevel){

    if (gamePattern[userLevel] === userPattern[userLevel]){
        if(gamePattern.length === userPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("#level-title").text("Game Over, Press any key to restart!");
        gamePattern=[];
        userPattern=[];
        started=false;
        level = 0;
    }
}