var honey = 0;
var worker_bees = 0;

function gatherHoney(amount) {
	honey += amount;
	document.getElementById("honey").innerHTML = honey;
};