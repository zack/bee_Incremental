var pollen = 0;
var worker_bees = 0;

function gatherPollen(amount) {
	pollen += amount;
	document.getElementById("pollen").innerHTML = pollen;
};