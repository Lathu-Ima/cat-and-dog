function start(event){
    playSound();
    catWorkerId=setInterval(catIdle,200);
    dogWorker=setInterval(dogIdle,200);
    
}

//Cat 
var cat = document.getElementById("cat");
var catImgNo = 1;
catWorkerId = 0;
function catIdle(){
    
    catImgNo++;
    if(catImgNo==11){
        catImgNo=1;
    }
    cat.src="cat/idle ("+catImgNo+").png";
}

//Dog
var dog = document.getElementById("dog");
var dogImgNo = 1;
var dogWorker =0;
function dogIdle(){
    dogImgNo++;
    if(dogImgNo==11){
        dogImgNo=1;
    }
    dog.src="dog/idle ("+dogImgNo+").png";
}

//Sound add
var startSound = new Audio("start.mp3");
startSound.loop = true;
function playSound(){
    startSound.play();    
}


