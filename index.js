const gameboard=document.querySelector('#gameboard');
const ctx=gameboard.getContext('2d');
const score=document.querySelector('#scoreboard');
const reset=document.querySelector('#resetbtn');
const gamewidth=gameboard.width;
const gameheight=gameboard.height;
const boardcolor="forestgreen";
const paddle1color="blue";
const paddle2color="red";
const paddleborder="black"
const ballcolor="yellow"
const ballbordercolor="black";
const ballradius=12.5;
const paddlespeed=20;
let ballspeed=1;
let ballx= gamewidth/2;
let bally=gameheight/2;
let ballxdirection=0;
let ballydirection=0;
let player1score=0;
let player2score=0;
let interval;
let paddle1={
    height:30,
    width:120,
    x:0,
    y:0
}

let paddle2={
    height:30,
    width:120,
    x:gamewidth-120,
    y:gameheight-30
}


window.addEventListener('keydown',changedirection);
reset.addEventListener('click',resetgame);

gameStart();
// drawpaddle();

function gameStart(){
    createball();
    nexttick();


};
function nexttick(){
    interval=setTimeout(() => {
        clearboard();
        drawpaddle();
        moveball();
        drawball(ballx,bally);
        checkcollision();
        nexttick();
    }, 10);

};
function clearboard(){
    ctx.fillStyle=boardcolor;
    ctx.fillRect(0,0,gamewidth,gameheight);
};
function createball(){
    ballspeed=2;
    if(Math.round(Math.random())==1){
        ballxdirection=1;
    }
    else{
        ballxdirection=-1;
    }
    if(Math.round(Math.random())==1){
        ballydirection=1;
    }
    else{
        ballydirection=-1;
    }
    ballx=gamewidth/2;
    bally=gameheight/2;
    drawball(ballx,bally);
};
function moveball(){
    ballx+=(ballspeed * ballxdirection);
    bally+=(ballspeed * ballydirection);
};
function changedirection(event){
    const keypressed=event.keyCode;
    const paddle1right= 39;
    const paddle1Left= 37;
    const paddle2right= 65;
    const paddle2Left= 68;


    switch(keypressed){
        case (paddle1Left):
            if(paddle1.x>0){
                paddle1.x-=paddlespeed;
            }
            break;
        case (paddle1right):
            if(paddle1.x< gamewidth-paddle1.width){
                paddle1.x+=paddlespeed;
            }
            break;
        case (paddle2right):
            if(paddle2.x>0){
                paddle2.x-=paddlespeed;
            }
            break;
        case (paddle2Left):
            if(paddle2.x< gamewidth-paddle2.width){
                paddle2.x+=paddlespeed;
            }
            break;
    }
};
function checkcollision(){
    if(ballx<=0+ballradius){
        ballxdirection*=-1;
    }
    if(ballx >= gamewidth-ballradius){
        ballxdirection*=-1;
    }
    if(bally<=0){
        player1score+=1
        updatescore();
        createball();
        return;

    }
    if(bally>=gameheight){
        player2score+=1
        updatescore();
        createball();
        return;
    }
    if(bally<=(paddle1.y + paddle1.height + ballradius)){
        if(ballx>paddle1.x && ballx<paddle1.x+paddle1.width){
            ballydirection*=-1;
            ballspeed+=0.1;
        }
    }
    if(bally>=(paddle2.y - ballradius)){
        if(ballx>paddle2.x && ballx<paddle2.x+paddle2.width){
            ballydirection*=-1;
            ballspeed+=0.1;
        }
    }
};
function drawball(ballx,bally){
    ctx.fillStyle=ballcolor;
    ctx.strokeStyle=ballbordercolor;
    ctx.beginPath();
    ctx.arc(ballx,bally,ballradius,0,2* Math.PI);
    ctx.stroke();
    ctx.fill();
};
function drawpaddle(){
    ctx.strokeStyle=paddleborder;

    ctx.fillStyle=paddle1color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);

    ctx.fillStyle=paddle2color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);

};
function updatescore(){
    score.textContent=`BLUE=${player1score}:RED=${player2score}`;
    // player1.strokeStyle="blue";
    
};

function resetgame(){
    player1score=0;
    player2score=0;
    ballx=0;
    bally=0;
    ballxdirection=0;
    ballydirection=0;
    paddle1={
        height:30,
        width:120,
        x:0,
        y:0
    }
    
    paddle2={
        height:30,
        width:120,
        x:gamewidth-120,
        y:gameheight-30
    }
    ballspeed=5;
    updatescore();
    clearInterval(interval);
    gameStart();

};