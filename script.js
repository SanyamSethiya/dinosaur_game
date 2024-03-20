score = 0;
cross = true;

audio = new Audio('main-music.mp3');
audiogo = new Audio('gameover.mp3');
audio.play();
// setTimeout(() => {
//     audio.play();
// }, 0);
document.onkeydown = function(e){
    console.log("Key code is ", e.key)
    if(e.key=="ArrowUp"){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if(e.key=="ArrowRight"){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }
    if(e.key=="ArrowLeft"){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetx = Math.abs(dx-ox);
    offsety = Math.abs(dy-oy);

    if(offsetx<73 && offsety<52){
        gameOver.innerHTML = "Game Over - Refresh the page to play again";
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    }
    else if (offsetx<145 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's'; 
            console.log("New animation duration: ", newDur)
        }, 500);
        
    }

}, 10);
function updateScore(score){
    scoreCount.innerHTML = "Your Score is " + score;
}