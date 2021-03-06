//
// Simulator
//

function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;

	for (var i = 0; i < 1; i++) {
		var pos = world.getRandomPosition();
		var foodSpawner = new FoodSpawner(world, pos.x, pos.y, 200, 10);
		world.foodSpawners.push(foodSpawner);
	}

	for (var i = 0; i < 5; i++) {
		var a = Agent.prototype.createAtRandomPosition(world);
		world.agents.push(a);
	}

	for (var i = 0; i < 10; i++) {
		var pos = world.getRandomPosition();
		world.foods.push(new Food(world, pos.x, pos.y));
	};

};

Simulator.prototype.start = function(simParams) {
	this.updatesPerWait = simParams.updatesPerWait;

	var slider = document.getElementById('slider');
	var updatesPerWaitElement = document.getElementById('updatesPerWait');

	var thisSimulator = this;
	this.loop = setInterval(function() {

		var sliderVal = +slider.value;
		thisSimulator.updatesPerWait = Math.ceil(sliderVal*sliderVal * 0.0001 * 50);
		updatesPerWaitElement.textContent = thisSimulator.updatesPerWait;

		thisSimulator.world.numUpdates += thisSimulator.updatesPerWait;
		for (var n = 0; n < thisSimulator.updatesPerWait; n++) {

			//Update foodSpawners
			for (var i = 0; i < thisSimulator.world.foodSpawners.length; ++i){
				thisSimulator.world.foodSpawners[i].update();
			}

			//Update agents
			for (var i = 0; i < thisSimulator.world.agents.length; ++i) {
				thisSimulator.world.agents[i].act();
			};
			
		}


	}, simParams.waitTime);
};

Simulator.prototype.stop = function() {
	clearInterval(this.loop)
	console.log('numUpdates:', this.world.numUpdates);
	console.log(this.world.agents.map(function(a) {
		return a.toString();
	}));
};
