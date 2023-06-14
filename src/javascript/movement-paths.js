import { createPathPoints } from "./utility";

export const curveFacePath =(curvePoints,y1ToCenter,y2ToCenter,a)=>{

    curvePoints.y1 =a > 0?curvePoints.y1 - 2*y1ToCenter:curvePoints.y1 + 2*y1ToCenter ;
    curvePoints.y2 =a > 0?curvePoints.y2 + 2*y2ToCenter:curvePoints.y2 - 2*y2ToCenter;
    curvePoints.y3 = curvePoints.y2,
    curvePoints.y4 = curvePoints.y1;

    return createPathPoints(curvePoints);
}

//a function that moves the curve on the x-axis left,right and center
export const moveXPath =(curvePoints,p)=>{

    curvePoints.x1 = curvePoints.x1+p;
    curvePoints.x2 = curvePoints.x2+p;
    curvePoints.x3 = curvePoints.x3+p,
    curvePoints.x4 = curvePoints.x4+p;

    return createPathPoints(curvePoints)

}

//a function that move the curve on the y-axis up,down and center
export const moveYPath = (curvePoints,q)=>{

    curvePoints.y1 = curvePoints.y1 + q;
    curvePoints.y2 = curvePoints.y2 + q;
    curvePoints.y3 = curvePoints.y3 + q,
    curvePoints.y4 = curvePoints.y4 + q;

    return createPathPoints(curvePoints);
}




