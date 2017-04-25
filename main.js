var pollen = 0;
var honey = 0;
var workerBees = 0;
var workerBeeCost = 2;

function updateResourceAmount() {
	document.getElementById("pollen").innerHTML = pollen;
	document.getElementById("honey").innerHTML = honey;
	document.getElementById("workerBees").innerHTML = workerBees;
	document.getElementById("workerBeeCost").innerHTML = workerBeeCost;
}


function gatherPollen(amount) {
	pollen += amount;
	updateResourceAmount();
};

function makeHoney(amount) {
	if (pollen>=5) {
		pollen-=5;
		honey+=1;
		updateResourceAmount();
	}
}

function spawnBee(amount) {
	if(honey >= workerBeeCost) {
		honey-=2;
		workerBees+=1;
		workerBeeCost = Math.floor(1.2*(workerBeeCost+1))
		updateResourceAmount();
	}
}