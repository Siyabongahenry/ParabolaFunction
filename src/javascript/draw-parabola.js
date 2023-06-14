
import {curveFacePath,moveXPath,moveYPath} from "./movement-paths";

import { concaveUpDownAnim,shiftLeftRightAnim,shiftUpDownAnim } from "./parabola-anims";

/******Global Variables on load******/

let cartesianPlane = document.getElementById("cartesian-plane");
let cartesianPlaneWith = cartesianPlane.clientWidth;
let cartesianPlaneHeight = cartesianPlane.clientHeight;

//svg path element
let curveElem = document.getElementById("para-curve");

//svg curve path points
//hp = horizonatl position
//vh = vertical position
let curvePoints= {
     ...convertPathToCurvePoints(),
     hp:"center", 
     vp:"center",
     face:"up"
};

//the distance between the center and y1
//this value can be calculated using the the initial values of svg elements in index.html
let y1ToCenter =Math.abs(curvePoints.y1 - cartesianPlaneHeight/2);

let y2ToCenter =Math.abs(curvePoints.y2 - cartesianPlaneHeight/2);


let reboChat = document.getElementById("robot-chat-box"); 

/*End of global variables*/


/*Methods calls on load */

//animation
concaveUpDownAnim(concaveDown,concaveUp);

shiftUpDownAnim(moveDown,moveUp);

shiftLeftRightAnim(moveLeft,moveRight);

let btnConcaveUp =  document.getElementById("a-gt-zero");
btnConcaveUp.addEventListener("click",concaveUp);

let btnConcaveDown = document.getElementById("a-lt-zero");
btnConcaveDown.addEventListener("click",concaveDown);

let btnMoveRight = document.getElementById("p-lt-zero");
btnMoveRight.addEventListener("click",moveRight);

let btnMoveLeft = document.getElementById("p-gt-zero");
btnMoveLeft.addEventListener("click",moveLeft);

let btnMoveCenterHP = document.getElementById("p-equal-zero");
btnMoveCenterHP.addEventListener("click",moveCenterHP);

let btnMoveUp = document.getElementById("q-gt-zero");
btnMoveUp.addEventListener("click",moveUp);

let btnMoveDown = document.getElementById("q-lt-zero");
btnMoveDown.addEventListener("click",moveDown);

let btnMoveCenterVP = document.getElementById("q-equal-zero");
btnMoveCenterVP.addEventListener("click",moveCenterVP);


function concaveUp()
{

     if(curvePoints.face === "up") return;

     let path = curveFacePath(curvePoints,y1ToCenter,y2ToCenter,1);
     curveElem.setAttribute("d",path);

     curvePoints.face ="up";

     unselectConcaveShapeBtns();

     btnConcaveUp.classList.add("btn-graph-selected");
    
}

function concaveDown()
{
     if(curvePoints.face === "down") return;

     let path = curveFacePath(curvePoints,y1ToCenter,y2ToCenter,-1);
     curveElem.setAttribute("d",path);

     curvePoints.face ="down";

     unselectConcaveShapeBtns();

     btnConcaveDown.classList.add("btn-graph-selected");
     
}


function moveCenterHP()
{
     if(curvePoints.hp === "center") return;

     let p = curvePoints.hp ==="left"?40:-40;
     let path = moveXPath(curvePoints,p);
     curveElem.setAttribute("d",path);

     curvePoints.hp = "center";

     unselectHMButtons();

     btnMoveCenterHP.classList.add("btn-graph-selected");
}

function moveRight()
{
     if(curvePoints.hp === "right") return;

     let p = curvePoints.hp ==="center"?40:80;
     let path = moveXPath(curvePoints,p);
     curveElem.setAttribute("d",path);

     curvePoints.hp ="right";

     unselectHMButtons();

     btnMoveRight.classList.add("btn-graph-selected");
}

function moveLeft()
{
     if(curvePoints.hp === "left") return;

     let p = curvePoints.hp ==="center"?-40:-80;
     let path = moveXPath(curvePoints,p);
     curveElem.setAttribute("d",path);

     curvePoints.hp ="left";

     unselectHMButtons();

     btnMoveLeft.classList.add("btn-graph-selected");
     
}

function moveCenterVP()
{
     if(curvePoints.vp === "center") return;

     let q = curvePoints.vp === "up"?40:-40;

     let path = moveYPath(curvePoints,q);
     curveElem.setAttribute("d",path);

     curvePoints.vp ="center";

     unselectVMButtons();

     btnMoveCenterVP.classList.add("btn-graph-selected");
}

function moveUp()
{
     if(curvePoints.vp === "up") return;

     let q = curvePoints.vp === "center"?-40:-80;

     let path = moveYPath(curvePoints,q);
     curveElem.setAttribute("d",path);

     curvePoints.vp ="up";

     unselectVMButtons();

     btnMoveUp.classList.add("btn-graph-selected");
}

function moveDown()
{
     if(curvePoints.vp === "down") return;

     let q = curvePoints.vp === "center"?40:80;

     let path = moveYPath(curvePoints,q);
     curveElem.setAttribute("d",path);

     curvePoints.vp = "down";

     unselectVMButtons();

     btnMoveDown.classList.add("btn-graph-selected");
}

//convert svg path points  to object
function convertPathToCurvePoints(){

     let pathString = curveElem.getAttribute("d");
         pathString = pathString
                    .replace(/(m|M)/," ")
                    .replace(/(c|C)/," ");

     let pathArr = pathString
               .split(" ")
               .filter(no => !isNaN(parseFloat(no)))
               .map((no)=>parseFloat(no));

    return {
          x1:pathArr[0],
          y1:pathArr[1],
          x2:pathArr[2],
          y2:pathArr[3],
          x3:pathArr[4],
          y3:pathArr[5],
          x4:pathArr[6],
          y4:pathArr[7]
    };

}

//unselect a buttons
function unselectConcaveShapeBtns()
{
     btnConcaveDown.classList.remove("btn-graph-selected");
     btnConcaveUp.classList.remove("btn-graph-selected");
}

//unselect p buttons
function unselectHMButtons(){
     btnMoveRight.classList.remove("btn-graph-selected");
     btnMoveLeft.classList.remove("btn-graph-selected");
     btnMoveCenterHP.classList.remove("btn-graph-selected");
}

//unselect q buttons
function unselectVMButtons(){
     btnMoveDown.classList.remove("btn-graph-selected");
     btnMoveUp.classList.remove("btn-graph-selected");
     btnMoveCenterVP.classList.remove("btn-graph-selected");
}