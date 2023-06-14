//animation variables that stores the setTimeout Id and setTimeInterval Id
let concaveUpDownTimeout =null;
let concaveUpADownAnimId = null;

let shiftUpDownAnimId = null;
let shiftUpDownAnimDelayId = null;
let shiftLeftRightDelayId = null;
let shiftLeftRightId = null;

//animation method that reflect the curve up or down
export const concaveUpDownAnim = (concaveDownFunc,concaveUpFunc)=>{

     let a =1;
     concaveUpADownAnimId = setInterval(()=>{

          if(a > 0)
          {

               concaveDownFunc();
               a =-1;
          }
          else
          {
               concaveUpFunc();
               a = 1;
          }

     },1000);

}

export const shiftUpDownAnim =(moveDownFunc,moveUpFunc)=>{

     let c = 0;
     shiftUpDownAnimDelayId = setTimeout(()=>{

          clearInterval(concaveUpADownAnimId);

          shiftUpDownAnimId = setInterval(()=>{

               if(c < 0)
               {
                    moveUpFunc();
                    c = 2;
               }
               else
               {
                    moveDownFunc();
                    c = -2;
               }

          },1000);

     },10000);

}

export const  shiftLeftRightAnim = (moveLeftFunc,moveRightFunc)=>{
     let p =0;
     shiftLeftRightDelayId =  setTimeout(()=>{

          clearTimeout(shiftUpDownAnimDelayId);
          clearInterval(shiftUpDownAnimId);

          shiftLeftRightId = setInterval(()=>{

               if( p != 2)
               {
                    moveLeftFunc();
                    p=2;
               }
               else
               {
                    moveRightFunc();
                    p=-2;
               }

          },1000);
     },20000);
}

document.getElementById("btn-stop-anim").addEventListener("click",(e)=>{

     e.target.innerText = "Start Animation";
     clearTimeout(concaveUpDownTimeout);
     clearInterval(concaveUpADownAnimId);
     clearTimeout(shiftUpDownAnimDelayId);
     clearInterval(shiftUpDownAnimId);
     clearTimeout(shiftLeftRightDelayId);
     clearInterval(shiftLeftRightId);  
});