# bee_Incremental
Minimal incremental game for learning purposes.
Inspired by kittens game: http://www.bloodrizer.ru/games/kittens/

Resources Used:
http://reddit.com/r/incremental_games
http://dhmholley.co.uk/incrementals.html

Thanks to:
github.com/Zack

Minimum Viable Product:
1. Button to increment pollen
2. Button to refine pollen to honey
3. Button to purchase bee
  1. Increasing bee cost
4. Bee increases pollen collected automatically

Improvements:
1. Keeping track of in game time
 	* One year should be 10-60 minutes
	1. Create nav bar at top for displaying time
	2. Create time variable in main.js
	3. Integrate time variable with window.setInterval function
2. Create an upgrade
	1. Make "Science Honey" a craftable resource
	2. Create button for crafting Science Honey"
	3. Create upgrades array to store upgrades
		* Write in a readable style
	4. Rewrite makeHoney function to check for upgrade
	5. Create a science tab
	6. Create purchase upgrade button
3. Create save feature
  1. Create save button in index.html
  2. Create save function in main.js
	3. Create clear save option on page
		* Create a confirmation for clearing save
