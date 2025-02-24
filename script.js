
let lift1Position = 0;
let lift2Position = 3;
let isLift1Moving = false;
let isLift2Moving = false;

function callLift(requestedFloor) {
    let lift1 = document.getElementById("lift1");
    let lift2 = document.getElementById("lift2");
    let messageBox = document.getElementById("messageBox");

    let distanceLift1 = Math.abs(requestedFloor - lift1Position);
    let distanceLift2 = Math.abs(requestedFloor - lift2Position);

    let selectedLift, liftId, liftPosition, isMoving;

    
    if (distanceLift1 <= distanceLift2 && !isLift1Moving) {
        selectedLift = lift1;
        liftPosition = lift1Position;
        isMoving = "isLift1Moving";
        liftId = "Lift 1";
    } else if (!isLift2Moving) { 
        selectedLift = lift2;
        liftPosition = lift2Position;
        isMoving = "isLift2Moving";
        liftId = "Lift 2";
    } else {
        messageBox.innerText = "Both lifts are currently moving. Try again later.";
        return;
    }

   
    if (isMoving === "isLift1Moving") isLift1Moving = true;
    if (isMoving === "isLift2Moving") isLift2Moving = true;

    let floorHeight = document.querySelector(".floor").clientHeight;
    selectedLift.style.bottom = requestedFloor * floorHeight + "px";

    messageBox.innerText = `${liftId} is coming to Floor ${requestedFloor}...`;

    setTimeout(() => {
        if (liftId === "Lift 1") {
            lift1Position = requestedFloor;
            isLift1Moving = false;
        } else {
            lift2Position = requestedFloor;
            isLift2Moving = false;
        }

       
        messageBox.innerText = `${liftId} has arrived at Floor ${requestedFloor}`;
    }, 1500); 
}
