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
		"pollen": 				100,
		"honey":					100,
		"scienceHoney":		100,
		"wax":						100,
	},
	gatherers: {
		"workerBees":			1,
	},
	costs: {
		"workerBeesCost": 2,
		"honeycombCost":	8,
	},
	time: 							0,
	unlocks: {
		"improvedFlight":	false,
	},
	structures: {
		"honeycomb": 			3,

	},
	// maximum values for resources and gatherers
	maxValues: {
		"maxPollen":				1000,
		"maxHoney":					1000,
		"maxScienceHoney":	1000,
		"maxWax":						1000,
		"maxWorkerBees":		3,
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
	refineWax(workerBeesAmount/20);
	updateHTML();

}, 1000);

// updateHTML() adjusts the html to reflect the game state.
function updateHTML() {
	updateResourcesHTML();
	updateGatherersHTML();
	updateCostsHTML();
	updateUnlocksHTML();
	updateStructuresHTML();
	updateMaxValuesHTML();
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

function updateStructuresHTML() {
	for (var structure in game.structures) {
		if(game.structures.hasOwnProperty(structure)) {
			document.getElementById(structure).innerHTML = game.structures[structure];
		}
	}
};

function updateMaxValuesHTML() {
	for (var value in game.maxValues) {
		if(game.maxValues.hasOwnProperty(value)) {
			document.getElementById(value).innerHTML = game.maxValues[value];
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
	if(game.maxValues.maxPollen > amount + game.resources.pollen) {
		game.resources.pollen += amount;
		updateHTML();
	}
};

function makeHoney(amount) {
	if (game.resources.pollen >= 5*amount && game.maxValues.maxHoney > game.resources.honey) {
		game.resources.pollen -= 5*amount;
		game.resources.honey += amount;
		updateHTML();
	}
}

function refineWax(amount) {
	if(game.resources.pollen >= 10*amount && game.maxValues.maxWax > amount + game.resources.wax) {
		game.resources.pollen -= 10*amount;
		game.resources.wax += amount;
		updateHTML();
	}
}

function spawnBee() {
	if(game.resources.honey >= game.costs.workerBeesCost && game.maxValues.maxWorkerBees > game.gatherers.workerBees) {
		game.resources.honey -= game.costs.workerBeesCost;
		game.gatherers.workerBees += 1;
		game.costs.workerBeesCost = Math.floor(1.2*(game.costs.workerBeesCost+1))
		updateHTML();
	}
}

function makeScienceHoney(amount) {
	if(game.resources.honey >= amount * 10 && game.maxValues.maxScienceHoney > game.resources.scienceHoney) {
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

// This shouldn't be used for buying more than 1
function constructHoneycomb() {
	if(game.resources.wax >= game.costs.honeycombCost) {
		game.resources.wax -= game.costs.honeycombCost;
		game.structures.honeycomb += 1;
		game.costs.honeycombCost = Math.floor(1.3*(game.costs.honeycombCost+1))
		game.maxValues.maxWorkerBees += 1;
		updateHTML();
	}
}
