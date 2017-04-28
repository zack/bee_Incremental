/*
main.js

Notes:
1.	updateResourceAmount might become clunky as more resources are added.
	Storing resources in a nested array may be easier;
	However, this approach may make the code less easy to read.
*/

// Resources
var pollen = 100;
var honey = 100;
var workerBees = 0;
var workerBeeCost = 2;
var scienceHoney = 100;
var time = 0;

// upgrades
var upgrades = {
	"workerBeesHoney": {
		"multiplier": 1,
		"improvedFlightUnlocked": false,
		"improvedFlightValue": 3,
	}
};

// Time tracker
window.setInterval(function() {
	time +=.5;
	day = Math.floor(time % 200)+1
	year = Math.floor(time / 200)
	document.getElementById("year").innerHTML = year;
	document.getElementById("day").innerHTML = day;

	gatherPollen(workerBees*upgrades.workerBeesHoney.multiplier);

}, 1000);

function updateResourceAmount() {
	document.getElementById("pollen").innerHTML = pollen;
	document.getElementById("honey").innerHTML = honey;
	document.getElementById("workerBees").innerHTML = workerBees;
	document.getElementById("workerBeeCost").innerHTML = workerBeeCost;
	document.getElementById("scienceHoney").innerHTML = scienceHoney;
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

function makeScienceHoney(amount) {
	if(honey >= amount * 10) {
		honey -= amount * 10;
		scienceHoney += amount;
		updateResourceAmount();
	}
}


function unlockImprovedFlight() {

}
