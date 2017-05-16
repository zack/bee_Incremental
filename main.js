/*
main.js
*/

//Everything that is saved is stored here
var game = {
  // Tab indention is fine, tab spacing doesn't work well. Don't put tabs
  // mid-line.
  //
  // Also, I changed some of the names here because keys in the
  // "cost" object, for instance, don't need to end with the word "cost."
  // They're already in the "cost" object. It's redundant and just increases
  // line length. This is, of course, just my opinion.
	time: 0,
	resources: {
		"pollen":               0,
		"honey":                0,
		"scienceHoney":         0,
		"wax":                  0,
	},
	gatherers: {
		"totalBees":            0,
		"freeBees":             0,
		"workerBees":           0,
		"scientistBees":        0,
	},
	costs: {
		"wax":                  5,
		"bees":                 2,
		"honeycomb":            8,
		"laboratory":           20,
		"storageCell":          100,
	},
	structures: {
		"honeycomb":            0,
		"laboratories":         0,
		"storageCell":          0,
	},
	unlocks: {
		//resources
		"wax":                  false,
		"scienceHoney":         false,

		//gatherers
		"gatherers":            false,
		"workerBees":           false,
		"scientistBees":        false,

		//structures
		"structures":           false,
		"laboratories":         false,
		"storageCell":          false,

		//actions
		"spawnBeeButton":       false,
		"makeScienceButton":    false,
		"constructHoneycomb":   false,
		"constructLaboratory":  false,
		"constructStorageCell": false,

		//science
		"science_bar":          false,
		"improvedFlightUnlock": false,
	},
	upgrades: {
		"improvedFlight":       false,
	},
	// maximum values for resources and gatherers
	maxValues: {
		"maxBees":              0,
		"maxPollen":            1000,
		"maxHoney":             1000,
		"maxScienceHoney":      1000,
		"maxWax":               1000,
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
  // I don't like mutating things, so I'm using a ternary here.
  var workerBeesRate = game.upgrades["improvedFlight"] ?
    game.gatherers.workerBees * 2 :
    game.gatherers.workerBees;

  // This looks like a great place to break this out into its own function.
  // Pass in workerBeesRate, generate a new `resources` object, and return it,
  // replacing the existing object wholesale.
	game.resources.pollen += 2 * workerBeesRate;
	game.resources.wax += .5 * workerBeesRate;
	game.resources.honey += .5 * workerBeesRate;

  // You only use this once, so I'm removing it. This line isn't too long.
	game.resources.scienceHoney += game.gatherers.scientistBees;
	updateHTML();
}, 5, so I'm using a ternary here.0);

// updateHTML() adjusts the html to reflect the game state.
function updateHTML() {
  // cool
	calculateValues();
	updateResourcesHTML();
	updateGatherersHTML();
	updateCostsHTML();
	updateStructuresHTML();
	updateMaxValuesHTML();
	updateUpgradesHTML();
	updateUnlocksHTML();
};

function calculateValues() {
  game.maxValues.maxBees = game.structures.honeycomb; // Huh?
	game.costs.beesCost = Math.floor(2+Math.pow(1.5,game.gatherers.totalBees))
	game.costs.honeycombCost =
		Math.floor(2+Math.pow(1.3,game.structures.honeycomb));
	game.costs.storageCellCost =
		Math.floor(100+Math.pow(1.01,game.structures.storageCell));

  // Another prime suspect for extraction to its own function, perhaps
	game.maxValues.maxPollen = 200+1000*game.structures.storageCell;
	game.maxValues.maxWax = 200+1000*game.structures.storageCell;
	game.maxValues.maxHoney = 200+1000*game.structures.storageCell;
	if(game.resources.pollen >= game.maxValues.maxPollen) {
		game.resources.pollen = game.maxValues.maxPollen;
	}
	if(game.resources.wax >= game.maxValues.maxWax) {
		game.resources.wax = game.maxValues.maxWax;
	}
	if(game.resources.honey >= game.maxValues.maxHoney) {
		game.resources.honey = game.maxValues.maxHoney;
	}
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
      // You shouldn't need this, but props for ingenuity.
      // Not sure why this would fail, but perhaps you can just check if
      // document.getElementById(gatherer) returns a value?
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

function updateUpgradesHTML() {
	for (var upgrade in game.upgrades) {
		if(game.upgrades[upgrade]) {
			document.getElementById(upgrade).setAttribute("hidden",true);
		} else {
			document.getElementById(upgrade).removeAttribute("hidden");
		}
	}
};

function updateUnlocksHTML() {
	for (var unlock in game.unlocks) {
    // Maybe:
    // var currStatus = document.getElementById(unlock).getAttribute("hidden");
    // document.getElementById(unlock).setAttribute(!currStatus);
    // Or something idk
		if(game.unlocks[unlock]) {
			document.getElementById(unlock).removeAttribute("hidden");
		} else {
			document.getElementById(unlock).setAttribute("hidden",true);
		}
	}
}

// Save feature
var toggleSaveMenu= function() {
	var saveDiv = document.getElementById("save");
  // Same below as above
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
    // Savage
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
	if(game.resources.pollen >= game.costs.waxCost*amount && game.maxValues.maxWax > amount + game.resources.wax) {
		game.resources.pollen -= game.costs.waxCost*amount;
		game.resources.wax += amount;
		game.unlocks.waxUnlock = true;
		game.unlocks.constructHoneycombUnlock = true;
		game.unlocks.constructLaboratoryUnlock = true;
		updateHTML();
	}
}

function spawnBee() {
	if(game.resources.honey >= game.costs.beesCost && game.maxValues.maxBees > game.gatherers.totalBees) {
		game.resources.honey -= game.costs.beesCost;
		game.gatherers.totalBees += 1;
		game.gatherers.freeBees += 1;
		game.gatherers.maxBees += 1;
		game.unlocks.gatherersUnlock = true;
		game.unlocks.workerBeesUnlock = true;
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
	if(game.resources.scienceHoney >= 5 && !game.upgrades["improvedFlight"]) {
		game.upgrades["improvedFlight"] = true;
		game.resources.scienceHoney -= 5;
		updateHTML();
	}
}

function constructHoneycomb() {
	if(game.resources.wax >= game.costs.honeycombCost) {
		game.resources.wax -= game.costs.honeycombCost;
		game.structures.honeycomb += 1;
		game.unlocks.structuresUnlock = true;
		game.unlocks.spawnBeeButtonUnlock = true;
		game.unlocks.constructStorageCellUnlock = true;
		updateHTML();
	}
}

function constructLaboratory() {
	if(game.resources.wax >= game.costs.laboratoryCost) {
		game.resources.wax -= game.costs.laboratoryCost;
		game.structures.laboratories += 1;
		game.unlocks.laboratoriesUnlock = true;
		game.unlocks.constructLaboratoryUnlock = true;
		game.unlocks.scientistBeesUnlock = true;
		game.unlocks.makeScienceButtonUnlock = true;
		game.unlocks.scienceHoneyUnlock = true;
		game.unlocks.science_bar = true;
		game.unlocks.improvedFlightUnlock = true;
	}
}

function constructStorageCell() {
	if (game.resources.wax >= game.costs.storageCellCost)	{
		game.resources.wax -= game.costs.storageCellCost;
		game.structures.storageCell += 1;
		game.unlocks.storageCellUnlock = true;
	}
}

// Debug Menu
function debugUnlockAll() {
	for (unlock in game.unlocks) {
		if (game.unlocks.hasOwnProperty(unlock)) {
			game.unlocks[unlock] = true;
		}
	}
}
