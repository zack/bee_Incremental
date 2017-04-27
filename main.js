/*
main.js

Notes:
1.	updateResourceAmount might become clunky as more resources are added.
	Storing resources in a nested array may be easier;
	However, this approach may make the code less easy to read.
*/

// Resources
var pollen = 0;
var honey = 0;
var workerBees = 0;
var workerBeeCost = 2;
var time = 0;

// Time tracker
window.setInterval(function() {
	time +=.5;
	day = Math.floor(time % 40)
	year = Math.floor(time / 40)
	document.getElementById("year").innerHTML = year;
	document.getElementById("day").innerHTML = day;

	gatherPollen(workerBees);

}, 1000);

function updateResourceAmount() {
	document.getElementById("pollen").innerHTML = pollen;
	document.getElementById("honey").innerHTML = honey;
	document.getElementById("workerBees").innerHTML = workerBees;
	document.getElementById("workerBeeCost").innerHTML = workerBeeCost;
}


// Button Functions
function gatherPollen(amount) {
	pollen += amount;
	updateResourceAmount();
};

function makeHoney(amount) {
	if (pollen >= 5) {
		pollen -= 5;
		honey += 1;
		updateResourceAmount();
	}
}

function spawnBee(amount) {
	if(honey >= workerBeeCost) {
		honey -= workerBeeCost;
		workerBees += 1;
		workerBeeCost = Math.floor(1.2*(workerBeeCost+1))
		updateResourceAmount();
	}
}
