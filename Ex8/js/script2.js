const height = 502;
const width = 502;

var paused = false;
let booli = true, boolj = false, boolz = false;
let i = 0, j = 0, z = 254;
let r;
let factor = 0;

function setup() {
    createCanvas(width, height);
    r = height / 2 - 16;
}

function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, TWO_PI);
    const v = p5.Vector.fromAngle(angle + PI);
    v.mult(r);
    return v;
}

function draw() {
    background(255);
    const total = 200; 
    factor += 0.008;

    translate(width / 2, height / 2);
    stroke(i, j, z);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, r * 2);

    strokeWeight(2);
    for (let i = 0; i < total; i++) {
        const a = getVector(i, total);
        const b = getVector(i * factor, total);
        line(a.x, a.y, b.x, b.y);
    }
    //rgb
    if (i > 254) {
        booli = false;
        boolj = true;
    }if (j > 254) {
        boolj = false;
        boolz = true;
    }if (z > 254) {
        boolz = false;
        booli = true;
    }if (booli) {
        i++;
        z--;
    }if (boolj) {
        j++;
        i--;
    }if (boolz) {
        z++;
        j--;
    }
}

function keyPressed() {
    if (event.code == 'Space')
        alert();
}
