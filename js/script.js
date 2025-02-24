
let lift1Position = 0;
let lift2Position = 3;
let isLift1Moving = false;
let isLift2Moving = false;
let lift1Queue=[];
let lift2Queue=[];

function callLift(requestedFloor) {
    let lift1 = document.getElementById("lift1");
    let lift2 = document.getElementById("lift2");
    let messageBox = document.getElementById("messageBox");

    let distanceLift1 = Math.abs(requestedFloor - lift1Position);
    let distanceLift2 = Math.abs(requestedFloor - lift2Position);

    let selectedLift, liftId, liftQueue, isMoving,liftPosition;

    
    if (distanceLift1 <= distanceLift2 && !isLift1Moving) {
        selectedLift = lift1;
        liftQueue = lift1Queue;
        liftId = "Lift 1";
        liftPosition=lift1Position;
        isMoving="isLift1Moving";
    } else if (!isLift2Moving) { 
        selectedLift = lift2;
        liftQueue = lift2Queue;
        liftId = "Lift 2";
        liftPosition=lift2Position;
        isMoving="isLift2Moving";
    } else {
        if (distanceLift1 < distanceLift2) {
            lift1Queue.push(requestedFloor);
        } else {
            lift2Queue.push(requestedFloor);
        }
        messageBox.innerText = "Both lifts are currently moving. Added to queue.";
        return;
    }
       if(isLift1Moving && liftId==="Lift 1"){
        lift1Queue.push(requestedFloor);
        return;
       }
       if(isLift2Moving && liftId==="Lift 2"){
        lift2Queue.push(requestedFloor);
        return;
       }
   
    if (liftId==="Lift 1") isLift1Moving = true;
    else  isLift2Moving = true;

    let floorHeight = document.querySelector(".floor").clientHeight;
    let travelTime= Math.abs(requestedFloor-(liftId==="Lift 1" ? lift1Position : lift2Position))*1000;
    selectedLift.style.bottom = requestedFloor * floorHeight + "px";
    selectedLift.style.transition = `bottom ${travelTime / 1000}s ease-in-out`;

    messageBox.innerText = `${liftId} is coming to Floor ${requestedFloor}...`;

    setTimeout(() => {
        openDoors(selectedLift);
        setTimeout(() => {
            closeDoors(selectedLift);

          
            if (liftId === "Lift 1") {
                lift1Position = requestedFloor;
                isLift1Moving = false;
            } else {
                lift2Position = requestedFloor;
                isLift2Moving = false;
            }

            messageBox.innerText = `${liftId} has arrived at Floor ${requestedFloor}`;
            processQueue(liftId);
            function processQueue(liftId) {
                let nextFloor;
                if (liftId === "Lift 1" && lift1Queue.length > 0) {
                    nextFloor = lift1Queue.shift();
                    callLift(nextFloor, "auto");
                } else if (liftId === "Lift 2" && lift2Queue.length > 0) {
                    nextFloor = lift2Queue.shift();
                    callLift(nextFloor, "auto");
                }
            }


        
        }, 2000); 
    }, travelTime);
}function openDoors(lift) {
    lift.style.backgroundColor = "lightgreen";
}
function closeDoors(lift) {
    lift.style.backgroundColor = "steelblue";
}
