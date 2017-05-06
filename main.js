/*
main.js

Notes:
1.	updateResourceAmount might become clunky as more resources are added.
	Storing resources in a nested array may be easier;
	However, this approach may make the code less easy to read.
*/

//Everything that is saved is stored here
var game = {
	resources: {
		"pollen": 			100,
		"honey":				100,
		"scienceHoney":	100,
	},
	gatherers: {
		"workerBees":		1,
	},
	costs: {
		"workerBeesCost": 2,
	},
	time: 0,
	unlocks: {
		"improvedFlight":	false,
	},
}

// Game state updater
window.setInterval(function() {
	//time
	game.time +=.5;
	day = Math.floor(game.time % 200)+1
	year = Math.floor(game.time / 200)
	document.getElementById("year").innerHTML = year;
	document.getElementById("day").innerHTML = day;

	//gatherer update
	var workerBeesAmount = game.gatherers.workerBees;
	if (game.unlocks["improvedFlight"]) {
		workerBeesAmount *=2;
	}
	gatherPollen(workerBeesAmount);
	updateHTML();

}, 1000);

// updateHTML() adjusts the html to reflect the game state.
function updateHTML() {
	updateResourcesHTML();
	updateGatherersHTML();
	updateCostsHTML();
	updateUnlocksHTML();
};

function updateResourcesHTML() {
	for (var resource in game.resources) {
		if (game.resources.hasOwnProperty(resource)) {
			document.getElementById(resource).innerHTML = game.resources[resource];
		}
	}
};

function updateGatherersHTML() {
	for (var gatherer in game.gatherers) {
		if(game.gatherers.hasOwnProperty(gatherer)) {
			document.getElementById(gatherer).innerHTML = game.gatherers[gatherer];
		}
	}
};

function updateCostsHTML() {
	for (var cost in game.costs) {
		if(game.costs.hasOwnProperty(cost)) {
			document.getElementById(cost).innerHTML = game.costs[cost];
		}
	}
};

function updateUnlocksHTML() {
	for (var unlock in game.unlocks) {
		if(game.unlocks[unlock]) {
			document.getElementById(unlock).setAttribute("hidden",true);
		} else {
			document.getElementById(unlock).removeAttribute("hidden");
		}
	}
};

// Save feature
// Serializes game state into text.
var toggleSaveMenu= function() {
	var saveDiv = document.getElementById("save");
	if (saveDiv.hasAttribute("hidden")) {
		saveDiv.removeAttribute("hidden");
	} else {
		saveDiv.setAttribute("hidden",true);
	}
};

var localSave = function() {
	localStorage.setItem("beeIncrementalSave", JSON.stringify(game));
};

var localLoad = function() {
	var load = JSON.parse(localStorage.getItem("beeIncrementalSave"));
	if (load) {
		game = load;
		updateHTML();
	}
};

var deleteSave = function(){
	confirmed = confirm(
		"Are you sure you want to kill all these poor poor bees, you monster?"
	);
	if (confirmed) {
		localStorage.removeItem("beeIncrementalSave");
	}
};

var exportSave = function() {
	document.getElementById("importExport").value = JSON.stringify(game);
}
// Load feature
var importSave = function() {
	savestring = document.getElementById("importExport").value;
	game = JSON.parse(savestring);
	updateHTML();
};

// Button Functions
function gatherPollen(amount) {
	game.resources.pollen += amount;
	updateHTML();
};

function makeHoney(amount) {
	if (game.resources.pollen >= 5) {
		game.resources.pollen -= 5;
		game.resources.honey += 1;
		updateHTML();
	}
}

function spawnBee(amount) {
	if(game.resources.honey >= game.costs.workerBeesCost) {
		game.resources.honey -= game.costs.workerBeesCost;
		game.gatherers.workerBees += 1;
		game.costs.workerBeesCost = Math.floor(1.2*(game.costs.workerBeesCost+1))
		updateHTML();
	}
}

function makeScienceHoney(amount) {
	if(game.resources.honey >= amount * 10) {
		game.resources.honey -= amount * 10;
		game.resources.scienceHoney += amount;
		updateHTML();
	}
}

function unlockImprovedFlight() {
	if(game.resources.scienceHoney >= 5 && !game.unlocks["improvedFlight"]) {
		game.unlocks["improvedFlight"] = true;
		game.resources.scienceHoney -= 5;
		updateHTML();
	}
}
