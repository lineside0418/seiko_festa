const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1366;
canvas.height = 768;
var playerX = canvas.width / 2 - 15;
var playerY = canvas.height - 300;
var fallfast = -3;
var time = 0;
var point = 0;
var win = 0;
var Life = 3;
var windowfast = 0;
var change = false;
var Pmode = false;
var AcloudX = canvas.width + 50;
var BcloudX = 50 + canvas.width * 3 / 2;
var AcloudY = random(0,canvas.height / 2);
var BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
var groundX = canvas.width * 2;
var planeX = canvas.width / 2;
var planeY = 100;
var Gamefast = 10; 
var GselectX = canvas.width / 2;
var PselectX = canvas.width * 3 / 2;
var fall = false;
var blackfillsize = 0;
var blackfillturn = false;
var GameoverY = -50;
const enter = new Audio('enter.mp3');
const fallAudio = new Audio('fall.mp3');
const safe = new Audio('safe.mp3');
const good = new Audio('good.mp3');
const windowchange = new Audio('windowchange.mp3');
const select = new Audio('select.mp3');
const bgm = new Audio('bgm.mp3');
bgm.addEventListener('ended', rebgm);
function rebgm(){
    bgm.currentTime = 0;
}

window.addEventListener('resize', resize);
function resize(){
    const aspect = canvas.width / canvas.height;
    const parentWidth = window.innerWidth;
    const parentHeight = window.innerHeight;
    let displayWidth = parentWidth;
    let displayHeight = parentWidth / aspect;
    if (displayHeight > parentHeight) {
        displayHeight = parentHeight;
        displayWidth = parentHeight * aspect;
    }
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
}
resize();

function random(min,max){
    return Math.random()*(max - min) + min;
}

canvas.addEventListener("pointerdown",touch,false);
function touch(e){
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    if(x <= 100 && y <= 100){
        document.location.reload();
    }else if(Pmode && x >= canvas.width - 100 && y >= canvas.height / 2 - 50 && y <= canvas.height / 2 + 50){
        windowchange.currentTime = 0;
        windowchange.play();
        windowfast += 1;
        if(windowfast > 3){
            windowfast = -3;
        }
    }else{
        change = true;
    }
}

function drawplayer(){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(playerX,playerY,10,Math.PI / 2,Math.PI * 5 / 2);
    ctx.lineTo(playerX,playerY + 40);
    ctx.lineTo(playerX + 15,playerY + 60);
    ctx.moveTo(playerX,playerY + 40);
    ctx.lineTo(playerX - 15,playerY + 60);
    ctx.moveTo(playerX,playerY + 20);
    ctx.quadraticCurveTo(playerX + 20,playerY + 20,playerX + 15,playerY - 10);
    ctx.moveTo(playerX,playerY + 20);
    ctx.quadraticCurveTo(playerX - 20,playerY + 20,playerX - 15,playerY - 10);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(playerX + 15,playerY - 10);
    ctx.lineTo(playerX + 65,playerY - 100);
    ctx.moveTo(playerX + 15,playerY - 10);
    ctx.lineTo(playerX + 25,playerY - 100);
    ctx.moveTo(playerX - 15,playerY - 10);
    ctx.lineTo(playerX - 65,playerY - 100);
    ctx.moveTo(playerX - 15,playerY - 10);
    ctx.lineTo(playerX - 25,playerY - 100);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(playerX + 65,playerY - 100);
    ctx.arc(playerX,playerY - 100,65,0,Math.PI,true);
    ctx.quadraticCurveTo(playerX - 45,playerY - 115,playerX - 25,playerY - 100);
    ctx.quadraticCurveTo(playerX,playerY - 120,playerX + 25,playerY - 100);
    ctx.quadraticCurveTo(playerX + 45,playerY - 115,playerX + 65,playerY - 100);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawreset(){
    ctx.beginPath();
    ctx.rect(0,0,100,100);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.font = "20px serif";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("リセット",50,50);
}

function drawchange(){
    ctx.beginPath();
    ctx.rect(canvas.width,canvas.height / 2 - 50,-100,100);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.font = "20px serif";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("風変",canvas.width - 50,canvas.height / 2);
}

function background(){
    ctx.beginPath();
    ctx.ellipse(AcloudX,AcloudY,50,10,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.ellipse(BcloudX,BcloudY,50,10,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

function drawground(){
    ctx.beginPath();
    ctx.ellipse(groundX,canvas.height - 10,50,10,0,0,Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.ellipse(groundX,canvas.height - 10,20,4,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fill();
    ctx.closePath();
}

function drawplane(){
    ctx.beginPath();
    ctx.moveTo(planeX + 60,planeY);
    ctx.arc(planeX + 30,planeY,30,0,Math.PI * 3 / 2,true);
    ctx.lineTo(planeX - 100,planeY - 30);
    ctx.lineTo(planeX - 110,planeY - 45);
    ctx.lineTo(planeX - 130,planeY - 45);
    ctx.lineTo(planeX - 100,planeY);
    ctx.lineTo(planeX - 50,planeY);
    ctx.lineTo(planeX - 45,planeY - 5);
    ctx.lineTo(planeX - 70,planeY + 20);
    ctx.lineTo(planeX - 55,planeY + 20);
    ctx.lineTo(planeX - 30,planeY - 5);
    ctx.lineTo(planeX - 35,planeY);
    ctx.lineTo(planeX + 60,planeY);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(planeX - 30,planeY - 30);
    ctx.lineTo(planeX - 45,planeY - 45);
    ctx.lineTo(planeX - 57.5,planeY - 45);
    ctx.lineTo(planeX - 42.5,planeY - 30);
    ctx.lineTo(planeX - 30,planeY - 30);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.clearRect(planeX - 22.5,planeY - 22.5,15,15);
    ctx.beginPath();
    ctx.rect(planeX - 22.5,planeY - 22.5,15,15);
    ctx.stroke();
    ctx.closePath();
}

function drawwindow(){
    ctx.font = "50px serif";
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText("風:　" + Math.abs(windowfast),canvas.width - 100,50);
    if(windowfast > 0){
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillText("→",canvas.width - 80,50);
    }else if(windowfast < 0){
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.fillText("←",canvas.width - 80,50);
    }
}

function drawscore(){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "30px serif";
    ctx.fillText("残機:" + Life + "　記録:" + win + "回　ポイント:" + point,400,30);
}

function Gamestart(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawplane();
    background();
    drawground();
    AcloudX -= Gamefast;
    BcloudX -= Gamefast;
    groundX -= Gamefast;
    if(AcloudX <= -50){
        AcloudX = canvas.width + 50
        AcloudY = random(0,canvas.height / 2);
    }
    if(BcloudX <= -50){
        BcloudX = canvas.width + 50;
        BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
    }
    if(groundX <= -50){
        groundX = random(canvas.width + 50,canvas.width * 2);
    }
    ctx.font = "75px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillText("着地の達人",canvas.width / 2,canvas.height / 3);
    ctx.font = "30px serif";
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fillText("地面に降ろして...",planeX + 200 + random(-3,3),planeY + random(-3,3));
    ctx.font = "50px serif";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillText("画面をタップしてスタート",canvas.width / 2,canvas.height * 2 / 3)
    ctx.font = "30px serif";
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText("左上の四角をタップすると問答無用でリセット",canvas.width / 2 + random(-5,5),canvas.height / 2 + random(-5,5));
    ctx.fillText("ルールをよく読む人は救われるでしょう",canvas.width / 2 + random(-5,5),canvas.height * 3 / 4 + random(-5,5));
    if(change == false){
        requestAnimationFrame(Gamestart);
    }else{
        change = false;
        groundX = 150;
        planeX = 200;
        playerX = planeX - 15;
        rule();
        return;
    }
}

function rule(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawplane();
    drawplayer();
    drawwindow();
    drawscore();
    ctx.font = "35px serif";
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fillText("窓から降りる",planeX - 25,planeY + 50);
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - 80,canvas.height / 10 - 40,160,60);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillText("遊び方",canvas.width / 2,canvas.height / 10);
    ctx.fillText("画面をタップすると、飛行機から飛び降りる！",canvas.width / 2,canvas.height / 5);
    ctx.fillText("うまく地面に着地させて、ポイントをゲット！",canvas.width / 2,canvas.height * 2 / 5);
    ctx.fillText("落下中、プレイヤーが風で動かされるので要注意！",canvas.width / 2,canvas.height * 3 / 5);
    ctx.fillText("画面をタップしてモードを選ぼう！",canvas.width / 2,canvas.height * 4 / 5);
    ctx.font = "45px serif";
    ctx.fillText("初めは練習モードで風の強さを掴むことを推奨",canvas.width / 2,canvas.height * 9 / 10);
    drawground();
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 9 / 40,canvas.height * 2 / 5);
    ctx.quadraticCurveTo(-150,canvas.height / 5,150,canvas.height * 17 / 20);
    ctx.lineTo(180,canvas.height * 3 / 4);
    ctx.lineTo(90,canvas.height * 4 / 5);
    ctx.lineTo(150,canvas.height * 17 / 20);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(canvas.width * 4 / 5,canvas.height * 3 / 5);
    ctx.quadraticCurveTo(canvas.width - 150,canvas.height * 3 / 5,canvas.width - 150,canvas.height * 3 / 16);
    ctx.lineTo(canvas.width - 200,canvas.height / 4);
    ctx.lineTo(canvas.width - 100,canvas.height / 4);
    ctx.lineTo(canvas.width - 150,canvas.height * 3 / 16);
    ctx.stroke();
    ctx.closePath();
    ctx.font = "35px serif";
    ctx.fillText("これが地面　成功するたびにゲームスピードが上がる(中心に近いと得点が高い)",650,canvas.height * 19 / 20);
    ctx.fillText("これが風の強さ ←3 ~ →3 まである",canvas.width - 300,canvas.height / 8);
    if(change == false){
        requestAnimationFrame(rule);
    }else{
        bgm.play();
        change = false;
        planeX = canvas.width / 2;
        playerX = planeX - 15;
        playerY = planeY - 60;
        Lady();
        return;
    }
}

function Lady(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    ctx.font = "50px serif";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillText("モードを選ぶべし",canvas.width / 2,250 + random(-5,5));
    drawplane();
    GselectX -= canvas.width / 60;
    PselectX -= canvas.width / 60;
    if(GselectX <= -canvas.width / 2){
        GselectX = canvas.width * 3 / 2;
    }
    if(PselectX <= -canvas.width / 2){
        PselectX = canvas.width * 3 / 2;
    }
    ctx.beginPath();
    ctx.ellipse(GselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("ゲームモード",GselectX,canvas.height / 2);
    ctx.beginPath();
    ctx.ellipse(PselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("練習モード",PselectX,canvas.height / 2);
    if(change == false){
        requestAnimationFrame(Lady);
    }else{
        bgm.pause();
        enter.currentTime = 0;
        enter.play();
        change = false;
        selectfall();
        return;
    }
}

function selectfall(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    drawplane();
    planeX += canvas.width / 60;
    ctx.beginPath();
    ctx.ellipse(GselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("ゲームモード",GselectX,canvas.height / 2);
    ctx.beginPath();
    ctx.ellipse(PselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("練習モード",PselectX,canvas.height / 2);
    drawplayer();
    playerY += fallfast;
    fallfast += 0.5;
    if(fallfast >= 5){
        fallfast = 5;
    }
    if(playerY + 60 >= canvas.height - 30){
        select.currentTime = 0;
        select.play();
        playerY = canvas.height - 90;
        if(playerX >= PselectX - canvas.width / 2 && playerX <= PselectX + canvas.width / 2){
            PracticeGo();
            return;
        }else{
            GameGo();
            return;
        }
    }
    requestAnimationFrame(selectfall);
}

function PracticeGo(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    ctx.beginPath();
    ctx.ellipse(GselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("ゲームモード",GselectX,canvas.height / 2);
    ctx.beginPath();
    ctx.ellipse(PselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("練習モード",PselectX,canvas.height / 2);
    drawplayer();
    var textfast = (canvas.width / 2 - PselectX) / 10;
    PselectX += textfast;
    GselectX += textfast;
    playerX += textfast;
    if(canvas.width / 2 - PselectX >= -1 && canvas.width / 2 - PselectX <= 1){
        select.pause();
        bgm.currentTime = 0;
        bgm.play();
        change = false;
        PselectX = canvas.width / 2;
        planeX = canvas.width / 2;
        playerX = planeX - 15;
        playerY = planeY - 60;
        AcloudX = canvas.width + 50;
        BcloudX = 50 + canvas.width * 3 / 2;
        AcloudY = random(0,canvas.height / 2);
        BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
        groundX = random(canvas.width * 2,canvas.width * 3);
        fallfast = -3;
        Pmode = true;
        Practice();
        return;
    }
    requestAnimationFrame(PracticeGo);
}

function GameGo(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    ctx.beginPath();
    ctx.ellipse(GselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("ゲームモード",GselectX,canvas.height / 2);
    ctx.beginPath();
    ctx.ellipse(PselectX,canvas.height - 30,canvas.width / 2,30,0,0,Math.PI * 2);
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("練習モード",PselectX,canvas.height / 2);
    drawplayer();
    var textfast = (canvas.width / 2 - GselectX) / 10;
    GselectX += textfast;
    PselectX += textfast;
    playerX += textfast;
    if(canvas.width / 2 - GselectX >= -1 && canvas.width / 2 - GselectX <= 1){
        select.pause();
        bgm.currentTime = 0;
        bgm.play();
        change = false;
        GselectX = canvas.width / 2;
        planeX = canvas.width / 2;
        playerX = planeX - 15;
        playerY = planeY - 60;
        AcloudX = canvas.width + 50;
        BcloudX = 50 + canvas.width * 3 / 2;
        AcloudY = random(0,canvas.height / 2);
        BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
        groundX = random(canvas.width * 2,canvas.width * 3);
        fallfast = -3;
        windowfast = Math.floor(random(-3,4));
        Game();
        return;
    }
    requestAnimationFrame(GameGo);
}



function Practice(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawchange();
    drawwindow();
    ctx.beginPath();
    ctx.rect(0,canvas.height / 3 - 60,canvas.width,80);
    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0,canvas.height / 3 * 2 - 60,canvas.width,80);
    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.fill();
    ctx.closePath();
    ctx.font = "50px serif";
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillText("画面をタップで落下！",canvas.width / 2,canvas.height / 3);
    ctx.fillText("ゲームモードをやるときは一回リセット",canvas.width / 2,canvas.height / 3 * 2);
    drawplane();
    background();
    drawground();
    AcloudX -= Gamefast;
    BcloudX -= Gamefast;
    groundX -= Gamefast;
    if(AcloudX <= -50){
        AcloudX = canvas.width + 40
        AcloudY = random(0,canvas.height / 2);
    }
    if(BcloudX <= -50){
        BcloudX = canvas.width + 40;
        BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
    }
    if(groundX <= -50){
        groundX = random(canvas.width + 50,canvas.width * 2);
    }
    if(change == false){
        time += 1 / 60;
        requestAnimationFrame(Practice);
    }else{
        bgm.pause();
        enter.currentTime = 0;
        enter.play();
        change = false;
        time = 0;
        Practicefall();
        return;
    }
}

function Practicefall(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    ctx.beginPath();
    ctx.rect(0,canvas.height / 4 - 30,canvas.width,40);
    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0,canvas.height / 2 - 30,canvas.width,40);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0,canvas.height / 4 * 3 - 30,canvas.width,40);
    ctx.fill();
    ctx.closePath();
    ctx.font = "30px serif";
    ctx.fillStyle = "rgb(255, 255, 0)";
    ctx.fillText("画面をもう一回タップでやり直せるよ！",canvas.width / 2,canvas.height / 4);
    ctx.fillText("右の四角をタップで風が←3,←2,←1,0,→1,→2,→3の順に変わる(練習限定)",canvas.width / 2,canvas.height / 2);
    ctx.fillText("ゲームモードをやるときは一回リセット",canvas.width / 2,canvas.height / 4 * 3);
    drawchange();
    drawplane();
    planeX += Gamefast;
    background();
    drawground();
    drawplayer();
    playerY += fallfast;
    playerX += windowfast;
    ctx.font = "50px serif";
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillText("判定",canvas.width / 2,canvas.height / 16);
    if(playerY + 60 >= canvas.height - 10){
        playerY = canvas.height - 70;
        playerX -= windowfast;
        if(playerX + 15 >= groundX - 20 && playerX - 15 <= groundX + 20){
            ctx.font = "75px serif";
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillText("いい感じ！",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
            if(fall == false){
                good.currentTime = 0;
                good.play();
                fall = true;
            }
        }else if(playerX + 15 >= groundX - 50 && playerX - 15 <= groundX + 50){
            ctx.font = "75px serif";
            ctx.fillStyle = "rgb(0, 0, 255)";
            ctx.fillText("ギリセーフ",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
            if(fall == false){
                safe.currentTime = 0;
                safe.play();
                fall = true;
            }
        }else{
            ctx.font = "75px serif";
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText("アウト",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
            if(fall == false){
                fallAudio.currentTime = 0;
                fallAudio.play();
                fall = true;
            }
        }
    }
    fallfast += 0.5;
    if(fallfast >= 5){
        fallfast = 5;
    }
    if(change == false){
        time += 1 / 60;
        requestAnimationFrame(Practicefall);
    }else{
        bgm.currentTime = 0;
        bgm.play();
        change = false;
        fall = false;
        planeX = canvas.width / 2;
        playerX = planeX - 15;
        playerY = planeY - 60;
        fallfast = -3;
        time = 0;
        Practice();
        return;
    }
}

function Game(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    drawscore();
    drawplane();
    background();
    drawground();
    AcloudX -= Gamefast;
    BcloudX -= Gamefast;
    groundX -= Gamefast;
    if(AcloudX <= -50){
        AcloudX = canvas.width + 40
        AcloudY = random(0,canvas.height / 2);
    }
    if(BcloudX <= -50){
        BcloudX = canvas.width + 40;
        BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
    }
    if(groundX <= -50){
        groundX = random(canvas.width + 50,canvas.width * 2);
    }
    if(change == false){
        requestAnimationFrame(Game);
    }else{
        bgm.pause();
        enter.currentTime = 0;
        enter.play();
        change = false;
        Gamefall();
        return;
    }
}

function Gamefall(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    drawscore();
    drawplane();
    planeX += Gamefast;
    drawplayer();
    background();
    drawground();
    drawplayer();
    playerY += fallfast;
    playerX += windowfast;
    if(playerY + 60 >= canvas.height - 10){
        playerY = canvas.height - 70;
        playerX -= windowfast;
        pointget();
        return;
    }
    fallfast += 0.5;
    if(fallfast >= 5){
        fallfast = 5;
    }
    requestAnimationFrame(Gamefall);
}

function pointget(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    drawscore();
    background();
    drawground();
    drawplayer();
    if(playerX + 15 >= groundX - 20 && playerX - 15 <= groundX + 20){
        good.currentTime = 0;
        good.play();
        ctx.font = "75px serif";
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillText("いい感じ！",canvas.width / 2,canvas.height / 8 + 20);
        win += 1;
        point += 200;
        Gamefast += 2;
    }else if(playerX + 15 >= groundX - 50 && playerX - 15 <= groundX + 50){
        safe.currentTime = 0;
        safe.play();
        ctx.font = "75px serif";
        ctx.fillStyle = "rgb(0, 0, 255)";
        ctx.fillText("ギリセーフ",canvas.width / 2,canvas.height / 8 + 20);
        win += 1;
        point += 100;
        Gamefast += 2;
    }else{
        fallAudio.currentTime = 0;
        fallAudio.play();
        ctx.font = "75px serif";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText("アウト",canvas.width / 2,canvas.height / 8 + 20);
        Life -= 1;
        fall = true;
        Gamefast = 10;
        if(Life == -1){
            Life = "GameOver"
            Gameover();
            return;
        }
    }
    reGame();
    return;
}

function reGame(){
    time += 1 / 60;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    drawscore();
    background();
    drawground();
    drawplayer();
    if(playerX + 15 >= groundX - 20 && playerX - 15 <= groundX + 20 && fall == false){
        ctx.font = "75px serif";
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillText("いい感じ！",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
    }else if(playerX + 15 >= groundX - 50 && playerX - 15 <= groundX + 50 && fall == false){
        ctx.font = "75px serif";
        ctx.fillStyle = "rgb(0, 0, 255)";
        ctx.fillText("ギリセーフ",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
    }else{
        ctx.font = "75px serif";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText("アウト",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
        playerY += fallfast;
        playerX += windowfast;
    }
    if(time >= 3){
        change = false;
        time = 0;
        planeX = canvas.width / 2;
        blackfill();
        return;
    }
    requestAnimationFrame(reGame);
}

function blackfill(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawreset();
    drawwindow();
    drawscore();
    background();
    drawground();
    if(blackfillturn == true){
        drawplane();
        AcloudX -= Gamefast;
        BcloudX -= Gamefast;
        groundX -= Gamefast;
        if(AcloudX <= -50){
            AcloudX = canvas.width + 40
            AcloudY = random(0,canvas.height / 2);
        }
        if(BcloudX <= -50){
            BcloudX = canvas.width + 40;
            BcloudY = random(canvas.height / 2,canvas.height * 4 / 5);
        }
        if(groundX <= -50){
            groundX = random(canvas.width + 50,canvas.width * 2);
        }
    }else{
        drawplayer();
        if(playerX + 15 >= groundX - 20 && playerX - 15 <= groundX + 20 && fall == false){
            ctx.font = "75px serif";
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillText("いい感じ！",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
        }else if(playerX + 15 >= groundX - 50 && playerX - 15 <= groundX + 50 && fall == false){
            ctx.font = "75px serif";
            ctx.fillStyle = "rgb(0, 0, 255)";
            ctx.fillText("ギリセーフ",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
        }else{
            ctx.font = "75px serif";
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText("アウト",canvas.width / 2 + random(-5,5),canvas.height / 8 + 20 + random(-5,5));
            playerY += fallfast;
            playerX += windowfast;
        }
    }
    if(blackfillturn == false){
        blackfillsize += 0.1
    }else{
        blackfillsize -= 0.075
    }
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,0,0," + blackfillsize + ")";
    ctx.fill();
    ctx.closePath();
    if(blackfillsize >= 1.5){
        change = false;
        time = 0;
        planeX = canvas.width / 2;
        blackfillturn = true;
        if(fall == false){
            windowfast = Math.floor(random(-3,4));
        }
    }
    if(blackfillsize < 0){
        bgm.currentTime = 0;
        bgm.play();
        change = false;
        time = 0;
        planeX = canvas.width / 2;
        playerX = planeX - 15;
        playerY = planeY - 60;
        fallfast = -3;
        fall = false;
        blackfillturn = false;
        Game();
        return;
    }
    requestAnimationFrame(blackfill);
}

function Gameover(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawwindow();
    drawscore();
    drawplane();
    planeX += Gamefast;
    drawplayer();
    background();
    drawground();
    drawplayer();
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,0,0,"+ GameoverY / (canvas.height / 2) * 3 / 4 +")"
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "100px serif";
    ctx.fillText("記録:" + win + "回　ポイント:" + point,canvas.width / 2, GameoverY - 300);
    ctx.fillText("リセットしてね",canvas.width / 2,GameoverY - 150);
    ctx.fillText("GameOver",canvas.width / 2,GameoverY);
    drawreset();
    playerY += fallfast;
    playerX += windowfast;
    GameoverY = Math.min(GameoverY + fallfast / 2,canvas.height * 2 / 3);
    requestAnimationFrame(Gameover);
}

Gamestart();