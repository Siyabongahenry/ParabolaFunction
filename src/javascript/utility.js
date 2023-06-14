export const createPathPoints =(curvePoints)=>{
    let points = "M"+curvePoints.x1+" "+curvePoints.y1
                  +"C"+curvePoints.x2+" "+curvePoints.y2
                  +" "+curvePoints.x3+" "+curvePoints.y3
                  +" "+curvePoints.x4+" "+curvePoints.y4;
    return points;
}