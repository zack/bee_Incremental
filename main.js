/*
main.js
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
		"totalBees":			0,
		"freeBees":				0,
		"workerBees":			0,
		"scientistBees":	0,
	},
	costs: {
		"beesCost": 2,
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
		"maxBees":					3,
		"maxPollen":				1000,
		"maxHoney":					1000,
		"maxScienceHoney":	1000,
		"maxWax":						1000,
	},
}

// Game state updater
window.setInterval(function() {
	//time
	game.time +=.25;
	day = Math.floor(game.time % 200)+1
	year = Math.floor(game.time / 200)
	document.getElementById("year").innerHTML = year;
	document.getElementById("day").innerHTML = day;

	//gatherer update
	var workerBeesRate = game.gatherers.workerBees;
	if (game.unlocks["improvedFlight"]) {
		workerBeesRate *= 2;
	}
	gatherPollen(workerBeesRate);
	refineWax(workerBeesRate/20);
	var scienceBeesRate = game.gatherers.scientistBees;
	game.resources.scienceHoney += scienceBeesRate;
	updateHTML();

}, 500);

// updateHTML() adjusts the html to reflect the game state.
function updateHTML() {
	calculateValues();
	updateResourcesHTML();
	updateGatherersHTML();
	updateCostsHTML();
	updateUnlocksHTML();
	updateStructuresHTML();
	updateMaxValuesHTML();
};

function calculateValues() {
	game.maxValues.maxBees = game.structures.honeycomb;
	game.costs.beesCost = Math.floor(2+Math.pow(1.5,game.maxValues.maxBees))
	game.costs.honeycombCost =
		Math.floor(2+Math.pow(1.3,game.structures.honeycomb))
/*
	game.gatherers.totalBees =
		game.gatherers.freeBees +
		game.gatherers.workerBees;
*/
};

function updateResourcesHTML() {
	for (var resource in game.resources) {
		if(game.resources.hasOwnProperty(resource)) {
			document.getElementById(resource).innerHTML = game.resources[resource];
		}
	}
};

function updateGatherersHTML() {
	for (var gatherer in game.gatherers) {
		if (game.gatherers.hasOwnProperty(gatherer)) {
			try {
				document.getElementById(gatherer).innerHTML = game.gatherers[gatherer];
			}
			catch (e) {
				console.log("ERROR: " + gatherer + " was not updated");
			}
		}
	}
};

function updateCostsHTML() {
	for (var cost in game.costs) {
		if (game.costs.hasOwnProperty(cost)) {
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
	if(game.resources.honey >= game.costs.beesCost && game.maxValues.maxBees > game.gatherers.totalBees) {
		game.resources.honey -= game.costs.beesCost;
		game.gatherers.totalBees += 1;
		game.gatherers.freeBees += 1;
		game.gatherers.maxBees += 1;
		updateHTML();
	}
}

function removeBees(beeType) {
	if(game.gatherers[beeType] > 0) {
		game.gatherers[beeType] -= 1;
		game.gatherers.freeBees += 1;
	}
}

function addBees(beeType) {
	if(game.gatherers.freeBees > 0) {
		game.gatherers.freeBees -= 1;
		game.gatherers[beeType] += 1;
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

function constructHoneycomb() {
	if(game.resources.wax >= game.costs.honeycombCost) {
		game.resources.wax -= game.costs.honeycombCost;
		game.structures.honeycomb += 1;
		updateHTML();
	}
}
