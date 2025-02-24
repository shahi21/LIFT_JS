
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

    // Assign the nearest available lift
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

    // Prevent another call while the lift is moving
    if (isMoving === "isLift1Moving") isLift1Moving = true;
    if (isMoving === "isLift2Moving") isLift2Moving = true;

    let floorHeight = document.querySelector(".floor").clientHeight;
    selectedLift.style.bottom = requestedFloor * floorHeight + "px";

    // Show message about which lift is moving
    messageBox.innerText = `${liftId} is coming to Floor ${requestedFloor}...`;

    // Update lift position after transition completes
    setTimeout(() => {
        if (liftId === "Lift 1") {
            lift1Position = requestedFloor;
            isLift1Moving = false;
        } else {
            lift2Position = requestedFloor;
            isLift2Moving = false;
        }

        // Update message when lift arrives
        messageBox.innerText = `${liftId} has arrived at Floor ${requestedFloor}`;
    }, 2000); // Adjust timeout based on CSS transition duration
}
