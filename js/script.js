const floors = 6;
let lift1 = { 
    position: 0, 
    moving: false,
     queue: [], 
     direction: null, 
     doorsOpen: false 
    };
let lift2 = { 
    position: 0,
     moving: false, 
     queue: [],
     direction: null, 
     doorsOpen: false 
    };
const floorHeight = 120;

function requestLift(requestedFloor, direction) {
    let lift = selectClosestLift(requestedFloor, direction);
    if (lift) {
        lift.queue.push(requestedFloor);
        processQueue(lift);
    }
}

function selectFloor(liftNumber, requestedFloor) {
    let lift = liftNumber === 1 ? lift1 : lift2;
    lift.queue.push(requestedFloor);
    processQueue(lift);
}

function selectClosestLift(requestedFloor, direction) {
    if (lift1.moving && lift2.moving) return null;
    if (!lift1.moving) return lift1;
    if (!lift2.moving) return lift2;
    let dist1 = Math.abs(lift1.position - requestedFloor);
    let dist2 = Math.abs(lift2.position - requestedFloor);
    return dist1 <= dist2 ? lift1 : lift2;
}




function processQueue(lift) {
    if (lift.moving || lift.queue.length === 0 || lift.doorsOpen) return;
    moveLift(lift); 
}



function moveLift(lift) {
    if (lift.moving || lift.queue.length === 0 || lift.doorsOpen) return;
    
    lift.moving = true;
    
    function processNextStop() {
        if (lift.queue.length === 0) {
            lift.moving = false;
            return; 
        }

        let nextFloor = lift.queue.shift();
        let liftElement = lift === lift1 ? document.getElementById('lift1') : document.getElementById('lift2');

        lift.direction = lift.position < nextFloor ? 'up' : 'down';

        console.log(`Moving ${liftElement.id} to Floor ${nextFloor}`);

      
        liftElement.style.transform = `translateY(${-nextFloor * floorHeight}px)`;

        let travelTime = Math.abs(lift.position - nextFloor) * 1000;

        setTimeout(() => {
            console.log(`${liftElement.id} reached Floor ${nextFloor}, opening doors`);
            liftElement.classList.replace('closed', 'open'); 
            lift.doorsOpen = true;
            
            setTimeout(() => {
                console.log(`${liftElement.id} closing doors`);
                liftElement.classList.replace('open', 'closed'); 
                lift.doorsOpen = false;
                
               
                processNextStop();
            }, 2000);
        }, travelTime); 
    }

    processNextStop();
}



