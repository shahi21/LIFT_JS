let lift1Position = 0;
let lift2Position = 3;
let isLift1Moving = false;
let isLift2Moving = false;
let lift1Queue = [];
let lift2Queue = [];

function callLift(requestedFloor) {
    let lift1 = document.getElementById("lift1");
    let lift2 = document.getElementById("lift2");
    let messageBox = document.getElementById("messageBox");

    let distanceLift1 = Math.abs(requestedFloor - lift1Position);
    let distanceLift2 = Math.abs(requestedFloor - lift2Position);

    let selectedLift, liftId, liftQueue, liftPosition;

   
    if (distanceLift1 <= distanceLift2 && !isLift1Moving) {
        selectedLift = lift1;
        liftQueue = lift1Queue;
        liftId = "Lift 1";
        liftPosition = lift1Position;
        isLift1Moving = true;
    } else if (!isLift2Moving) {
        selectedLift = lift2;
        liftQueue = lift2Queue;
        liftId = "Lift 2";
        liftPosition = lift2Position;
        isLift2Moving = true;
    } else {
      
        if (distanceLift1 < distanceLift2 && !lift1Queue.includes(requestedFloor)) {
            lift1Queue.push(requestedFloor);
        } else if (!lift2Queue.includes(requestedFloor)) {
            lift2Queue.push(requestedFloor);
        }
        messageBox.innerText = "Both lifts are currently moving. Added to queue.";
        return;
    }

    let floorHeight = document.querySelector(".floor").clientHeight ; 
    let travelTime = Math.abs(requestedFloor - liftPosition) * 1000; 

   
    selectedLift.style.transition = `bottom ${travelTime / 1000}s ease-in-out`;
    selectedLift.style.bottom = requestedFloor * floorHeight + "px";
    messageBox.innerText = `${liftId} is coming to Floor ${requestedFloor}...`;

    setTimeout(() => {
        openDoors(selectedLift);
        messageBox.innerText = `${liftId} has arrived at Floor ${requestedFloor}`;

        setTimeout(() => {
            closeDoors(selectedLift);

           
            if (liftId === "Lift 1") {
                lift1Position = requestedFloor;
                isLift1Moving = false;
                document.getElementById("lift1Display").innerText = requestedFloor;
            } else {
                lift2Position = requestedFloor;
                isLift2Moving = false;
                document.getElementById("lift2Display").innerText = requestedFloor;
            }

        
            processQueue();

        }, 2000);

    }, travelTime); 
}


function processQueue() {
    if (!isLift1Moving && lift1Queue.length > 0) {
        let nextFloor = lift1Queue.shift();
        callLift(nextFloor,"auto");
    }
    if (!isLift2Moving && lift2Queue.length > 0) {
        let nextFloor = lift2Queue.shift();
        callLift(nextFloor,"auto");
    }
}

function openDoors(lift) {
    lift.style.backgroundColor = "lightgreen";
}

function closeDoors(lift) {
    lift.style.backgroundColor = "steelblue";
}
