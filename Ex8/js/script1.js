var xarr1 = [];
var yarr1 = [];
var xarr2 = [];
var yarr2 = [];
var kc;
let a=false;
let x;
let y;
var canvas = document.getElementById('canvas');

function setup(){
    createCanvas(500,500);
    background(0);
}
function mouseDragged(){
    if (!a){
        x=mouseX;
        y=mouseY;
        xarr1.push(x);
        yarr1.push(y);
        a=true;
    }
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "white";
    ctx.clearRect(0, 0, 500, 500);
    background(0);
    if ((xarr2.length)>0) for (let i = 0; i < xarr2.length; i++)
        ctx.strokeRect(xarr1[i], yarr1[i], xarr2[i]-xarr1[i], yarr2[i]-yarr1[i]);
    ctx.strokeRect(x, y, mouseX-x, mouseY-y);
}
function mouseReleased(){
    xarr2.push(mouseX);
    yarr2.push(mouseY);
    a=false;
}
function keyPressed() {
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        xarr1.pop();
        yarr1.pop();
        xarr2.pop();
        yarr2.pop();
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "white";
        ctx.clearRect(0, 0, 500, 500);
        background(0);
        for (let i = 0; i < xarr2.length; i++)
            ctx.strokeRect(xarr1[i], yarr1[i], xarr2[i]-xarr1[i], yarr2[i]-yarr1[i]);
    }
}

