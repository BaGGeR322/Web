{
var rbackgr1 = 71;
var rbackgr2 = 71;
var rbackgr3 = 71;
var rlin1 = 255;
var rlin2 = 255;
var rlin3 = 255;
function rback1() {
    rbackgr1 = document.getElementById("line1").value;
    my = document.getElementById("rgbback1");
    my.innerHTML = rbackgr1;
}
function rback2() {
    rbackgr2 = document.getElementById("line2").value;
    my = document.getElementById("rgbback2");
    my.innerHTML = rbackgr2;
}
function rback3() {
    rbackgr3 = document.getElementById("line3").value;
    my = document.getElementById("rgbback3");
    my.innerHTML = rbackgr3;
}
function rline1() {
    rlin1 = document.getElementById("line4").value;
    my = document.getElementById("rgbline1");
    my.innerHTML = rlin1;
}
function rline2() {
    rlin2 = document.getElementById("line5").value;
    my = document.getElementById("rgbline2");
    my.innerHTML = rlin2;
}
function rline3() {
    rlin3 = document.getElementById("line6").value;
    my = document.getElementById("rgbline3");
    my.innerHTML = rlin3;
}
}
var x = 0;
function addInput(){
    var str = '<input type="text" placeholder="ИЗ" id="inputtype'+x+'"> <div id="input' + (x + 1) + '"></div>';
    document.getElementById('input' + x).innerHTML = str;
    x++;
    var str = '<input type="text" placeholder="В" id="inputtype'+x+'"> <div id="input' + (x + 1) + '"></div>';
    document.getElementById('input' + x).innerHTML = str;
    x++;
}

var KSteps = 1;
var axiom = "F++F++F";
var sentence = axiom;
var NumToAngle = 60;
var angle;
var lengthfactor = 1.36;
var len = 300;
var genlen = len;
var genangle = angle;
var div = 3;
var orig1 = 400;
var orig2 = 600;
var TextRules = 
"F -> >F< <br> a -> F[+x]Fb<br>b -> F[-y]Fa<br>x -> a<br>y -> b"

var rules = [];
rules[0] = {
    a: "F",
    b: "F-F++F-F"
}

function FXFFXF (){
    axiom = "F+XF+F+XF";
    rules = [];
    rules[0] = {
        a: "X",
        b: "XF-F+F-XF+F+XF-F+F-X"
    }
    orig1 = 1.1;
    orig2 = 2;
    div = 2;
    len = 120;
    NumToAngle = 90;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#TextRules').html($(this).text());
    $('#Div').html(div + ' ');
    generateF();
}
function Y (){
    axiom = "Y";
    rules = [];
    rules[0] = {
        a: "X",
        b: "X[-FFF][+FFF]FX"
    }
    rules[1] = {
        a: "Y",
        b: "YFX[+Y][-Y]"
    }
    div = 1.65;
    len = 150;
    orig1 = 2;
    orig2 = 1;
    NumToAngle = 25.7;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#TextRules').html("X -> X[-FFF][+FFF]FX <br> Y -> YFX[+Y][-Y]");
    $('#Div').html(div + ' ');
    generateF();
}
function F1 (){
    axiom = "F";
    rules = [];
    rules[0] = {
        a: "F",
        b: "FF+[+F-F-F]-[-F+F+F]"
    }
    div = 2;
    len = 150;
    orig1 = 2;
    orig2 = 1;
    NumToAngle = 22.5;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#TextRules').html($(this).text());
    $('#Div').html(div + ' ');
    generateF();
}
function F2 (){
    axiom = "F";
    rules = [];
    rules[0] = {
        a: "F",
        b: "F[+FF][-FF]F[-F][+F]F"
    }
    div = 2.1;
    len = 120;
    orig1 = 2;
    orig2 = 1;
    NumToAngle = 35;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#TextRules').html($(this).text());
    $('#Div').html(div + ' ');
    generateF();
}
function VZFFF (){
    axiom = "VZFFF";
    rules = [];
    rules[0] = {
        a: "V",
        b: "[+++W][---W]YV"
    }
    rules[1] = {
        a: "W",
        b: "+X[-W]Z"
    }
    rules[2] = {
        a: "X",
        b: "-W[+X]Z"
    }
    rules[3] = {
        a: "Y",
        b: "YZ"
    }
    rules[4] = {
        a: "Z",
        b: "[-FFF][+FFF]F"
    }
    div = 1.25;
    len = 120;
    orig1 = 2;
    orig2 = 1;
    NumToAngle = 20;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#Div').html(div + ' ');
    $('#TextRules').html("V -> [+++W][---W]YV <br> W -> +X[-W]Z <br> X -> -W[+X]Z <br> Y -> YZ <br> Z -> [-FFF][+FFF]F");
    generateF();
}
function YX (){
    axiom = "YF";
    rules = [];
    rules[0] = {
        a: "X",
        b: "YF+XF+Y"
    }
    rules[1] = {
        a: "Y",
        b: "XF-YF-X"
    }
    div = 1.7;
    len = 120;
    orig1 = 2;
    orig2 = 1;
    NumToAngle = 60;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#TextRules').html("X -> YF+XF+Y <br> Y -> XF-YF-X");
    $('#Div').html(div + ' ');
    generateF();
}
function X (){
    axiom = "X";
    rules = [];
    rules[0] = {
        a: "F",
        b: "FF"
    }
    rules[1] = {
        a: "X",
        b: "F[+X]F[-X]+X"
    }
    div = 1.85;
    len = 120;
    orig1 = 2;
    orig2 = 1;
    NumToAngle = 20;
    angle = radians(NumToAngle);
    sentence = axiom;
    $('#TextAngle').html(NumToAngle);
    $('#axiom').html(axiom);
    $('#TextRules').html("F -> FF <br> X -> F[+X]F[-X]+X");
    $('#Div').html(div + ' ');
    generateF();
}


function PushAngle (){
    NumToAngle = $('#TextAngleIn').val();
    angle = radians(NumToAngle);
    $('#TextAngle').html(NumToAngle + '°');
}

function PushSteps (){
    KSteps = $('#StepsIn').val();
    $('#Steps').html(KSteps + " ");
    for (var i = 0; i< KSteps; i++) generateF();
}

function PushLen (){
    len = $('#TextLenIn').val();
    $('#Len').html(len);
}

function PushDiv(){
    div = $('#TextDivIn').val();
    $('#Div').html(div + ' ');
}

function but_left(){
    orig1 -= 20;
}
function but_right(){
    orig1 += 20;
}
function but_center(){
    orig1 = 400;
    orig2 = 800;
}
function but_top(){
    orig2 -= 20;
}
function but_down(){
    orig2 += 20;
}
function but_rotleft(){
    rotate(-inRad(45));
}
function but_rotright(){
    rotate(inRad(45));
}


function ApplyF (){
    var texts = "";
    orig1 = 2;
    orig2 = 1;
    axiom = $('#TextAxioma').val();
    len = 120;
    sentence = axiom;
    $('#axiom').html(axiom);
    div = 1.85;
    
    rules = [];

    for (var i = 0, j = 0; i < x; i+=2, j++){
        if ($('#inputtype' + i).val().length > 0 && $('#inputtype' + (i+1)).val().length > 0)
        {
            rules[j] = {
                a: $('#inputtype' + i).val(),  
                b: $('#inputtype' + (i+1)).val()
            }
            texts += $('#inputtype' + i).val() + "->" + $('#inputtype' + (i+1)).val() + "<br>";
        }
    }
    $('#axiom').html(axiom);
    $('#TextRules').html(texts);
    generateF();
    $('#Div').html(div + ' ');
}


function generateF() {
    len /= div;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        var found = false;
        for (var j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }
        if (!found) {
            nextSentence += current;
            if (current == ">") nextSentence += "F";
        }
    }
    sentence = nextSentence;
    //createP(sentence);
    turtle();
}

function turtle(){
    genlen = len;
    genangle = angle;
    translate(orig1, orig2);
    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);

        if (current == "F"){
            line (0,0,0,-len);
            translate(0, -len);
        } else if (current == "+") {
            rotate(-angle);
        } else if (current == "-") {
            rotate(angle);
        } else if (current == "[") {
            push();
        } else if (current == "]") {
            pop();
        } else if (current == "f") {
            translate(0, -len);
        } else if (current == "|") {
            len = -len;
        } else if (current == "&") {
            angle = -angle;
        } 
    }
    len = genlen;
    angle = genangle;
    $('#Len').html(len);
}

function setup() {
    {
        $('#FXFFXF').on('click', FXFFXF);
        $('#Y').on('click', Y);
        $('#F1').on('click', F1);
        $('#F2').on('click', F2);
        $('#VZFFF').on('click', VZFFF);
        $('#YX').on('click', YX);
        $('#X').on('click', X);

        $('#PushAngle').on('click', PushAngle);
        $('#generate').on('click', generateF);
        $('#PushSteps').on('click', PushSteps);
        $('#PushLen').on('click', PushLen);
        $('#ApplyF').on('click', ApplyF);
        $('#PushDiv').on('click', PushDiv);

        $('#but_left').on('click', but_left);
        $('#but_center').on('click', but_center);
        $('#but_right').on('click', but_right);
        $('#but_top').on('click', but_top);
        $('#but_down').on('click', but_down);

        $('#but_rotleft').on('click', but_rotleft);
        $('#but_rotright').on('click', but_rotright);
    }

    //createP(axiom);
    $('#Div').html(div + ' ');

    $('#axiom').html(axiom);
    $('#TextRules').html(TextRules);

    angle = radians(NumToAngle);

    createCanvas(800, 800);
    generateF();
}

function draw(){
    background(rbackgr1, rbackgr2, rbackgr3);
    stroke(rlin1, rlin2, rlin3, 100);
    turtle();
}