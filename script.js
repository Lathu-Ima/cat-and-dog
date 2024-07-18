var runStart = 0;

function keyCheck(event){  

    //Enter Key
    if(event.which == 13){
        if(runWorkerId == 0){
            runWorkerId = setInterval(run,100);  
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground,100);
            scoreworkerId = setInterval(updateScore,100);
            createBlockId = setInterval(createBlock,100);
            moveBlockId = setInterval(moveBlocks,100);
        }    
    }

    //Space Key
    if(event.which == 32){
        if(runStart == 1){
            if(jumpWorkerId == 0){
                clearInterval(runWorkerId);
                
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();
                
            }
        }
        
    }
}

var runSound = new Audio("run3.mp3");
runSound.loop = true;
//Run function
var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;
function run(){
    runImageNumber++;
    if (runImageNumber == 9){
        runImageNumber=1;
    }
    player.src = "cat/Run ("+ runImageNumber +").png";
}
var jumpSound = new Audio("jump.mp3"); 
//Jump Function
var jumpImageNumber = 1;
var playerMarginTop = 420;
var jumpWorkerId = 0;
function jump(){
    jumpImageNumber++;
    if(jumpImageNumber<=7){
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";
    }
    if(jumpImageNumber>=8){
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";
    }
    if (jumpImageNumber == 13){
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run,100);
        
    }
    
    player.src = "cat/Jump ("+ jumpImageNumber +").png";

}

//Move Background
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX+"px";
}

//Update Score
var score = document.getElementById("score");
var newScore = 0;
var scoreworkerId = 0;
function updateScore(){
    score.style.visibility = "visible";
    newScore++;
    score.innerHTML = newScore;

    if(newScore==100){
        clearInterval(runWorkerId);
        runSound.pause();
        clearInterval(jumpWorkerId);
        jumpWorkerId=-1;
        clearInterval(backgroundWorkerId);
        clearInterval(scoreworkerId);
        clearInterval(createBlockId);
        clearInterval(moveBlockId);

        walkId= setInterval(winGame,100);
        winSound.play();
    
    }
}
//Create block
var createBlockId = 0;
var blockMarginLeft = 600;
var blockId = 1;
function createBlock(){

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random()*(1000-400)+400;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    background.appendChild(block);
}

//Move Block
var moveBlockId = 0;
function moveBlocks(){
    for(var i =1;i<=blockId;i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
        
        if(newMarginLeft<=113){
            if(newMarginLeft>=53){
                if(playerMarginTop<=420){
                    if(playerMarginTop>=360){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId=-1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreworkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlockId);

                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();
                    }
                }
                
            }
        }
       
    }
}

var deadSound = new Audio("dead.mp3");
//Dead Function
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead(){
    deadImageNumber++;
    if(deadImageNumber == 11){
        deadImageNumber = 10;

        player.style.marginTop = "420px";
        document.getElementById("endScore").innerHTML ="Your Score: " + newScore;
        document.getElementById("gameOver").style.visibility = "visible";
    }
    player.src = "cat/Dead ("+deadImageNumber+").png";
}

//Restart

function re(){
    location.reload();
}


//Win 
var walkId = 0;
var winSound = new Audio("win.mp3");

function winGame(){
    
    document.getElementById("endScore").innerHTML ="You Win!!!";
    document.getElementById("gameOver").style.visibility = "visible";
    
}