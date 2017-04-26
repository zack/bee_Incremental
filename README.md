# bee_Incremental
Minimal incremental game for learning purposes.

Minimum Viable Product:
1. button to increment pollen
2. button to refine pollen to honey
3. button to purchase bee
  1. increasing bee cost
4. bee increases pollen collected automatically

Improvements:
1. Keeping track of in game time
 	* One year should be 10-60 minutes
	1. Create nav bar at top for displaying time
	2. Create time variable in main.js
	3. integrate time variable with window.setInterval function
2. Create an upgrade
	1. Make "Science Honey" a craftable resource
	2. Create button for crafting Science Honey"
	3. create upgrades array to store upgrades
		* write in a readable style
	4. Rewrite makeHoney function to check for upgrade
	5. Create a science tab
	6. Create purchase upgrade button
3. Create save feature
	1. create clear save option on page
		1. make an html div for clear save
		2. Create a confirmation for clearing save
