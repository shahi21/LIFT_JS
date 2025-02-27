const floors = 6; 
let lift1Position = 0;
let lift2Position = 0;
let lift1Moving = false;
let lift2Moving = false;
const floorHeight = 120;

function createBuilding() {
    const building = document.getElementById('building');
    for (let i = 0; i < floors; i++) {
        const floor = document.createElement('div');
        floor.classList.add('floor');
        floor.innerHTML = `
            Floor ${i}
            <div class="buttons">
                <button onclick="requestLift(${i})">Call</button>
            </div>
        `;
        building.appendChild(floor);
    }
    
    createLifts(building);
}

function createLifts(building) {
    for (let i = 1; i <= 2; i++) {
        const lift = document.createElement('div');
        lift.classList.add('lift', 'closed');
        lift.id = `lift${i}`;
        lift.style.left = i === 1 ? '70px' : '140px';
        lift.style.bottom = '0px';
        lift.innerHTML = createInsideButtons(i);
        building.appendChild(lift);
    }
}

function createInsideButtons(liftNumber) {
    let buttons = '<div class="inside-buttons">';
    for (let i = 0; i < floors; i++) {
        buttons += `<button onclick="selectFloor(${liftNumber}, ${i})">${i}</button>`;
    }
    buttons += '</div>';
    return buttons;
}

function requestLift(requestedFloor) {
    let lift = selectClosestLift(requestedFloor);
    moveLift(lift, requestedFloor);
}

function selectFloor(liftNumber, requestedFloor) {
    let lift = document.getElementById(`lift${liftNumber}`);
    moveLift(lift, requestedFloor);
}

function selectClosestLift(requestedFloor) {
    let lift1 = document.getElementById('lift1');
    let lift2 = document.getElementById('lift2');
    let distance1 = Math.abs(lift1Position - requestedFloor);
    let distance2 = Math.abs(lift2Position - requestedFloor);
    return distance1 <= distance2 ? lift1 : lift2;
}

function moveLift(lift, floor) {
    if (lift.id === 'lift1') lift1Moving = true;
    if (lift.id === 'lift2') lift2Moving = true;
    lift.classList.replace('closed', 'open');
    lift.style.transform = `translateY(${-floor * floorHeight}px)`;
    setTimeout(() => {
        lift.classList.replace('open', 'closed');
        if (lift.id === 'lift1') lift1Moving = false, lift1Position = floor;
        if (lift.id === 'lift2') lift2Moving = false, lift2Position = floor;
    }, 2500);
}
createBuilding();