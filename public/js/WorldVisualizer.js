//
// WorldVisualizer
//

function WorldVisualizer (world) {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
	var bmd;
	var bitmapSprite;
	
	function preload() {

	}
	
	function create() {
        bmd = game.add.bitmapData(800,600);
        bitmapSprite = game.add.sprite(0, 0, bmd);
	}

	function rgb(r,g,b){
		return'rgb(' + r + ',' + g + ',' + b + ')';
	}
	
	function update() {		
		bmd.clear(0,0,800,600);
		var foodRadius = 10;
		var agentRadius = 10;

		// Draw food spawners
		for (var i = 0; i < world.foodSpawners.length; i++) {
			var foodSpawner = world.foodSpawners[i];
			// Draw circle
			bmd.ctx.fillStyle = '#449944';
			bmd.ctx.beginPath();
			bmd.ctx.arc(foodSpawner.x, foodSpawner.y, foodSpawner.radius, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();
		}

		// Draw food
		for (var i = 0; i < world.foods.length; i++) {
			var food = world.foods[i];
			// Draw circle
			bmd.ctx.fillStyle = '#994444';
			bmd.ctx.beginPath();
			bmd.ctx.arc(food.x, food.y, foodRadius, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();
		}
		// Draw agents
		for (var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];

			// Draw attention radius
			bmd.ctx.strokeStyle = '#333';
			bmd.ctx.lineWidth = 2;
			bmd.ctx.beginPath();
			bmd.ctx.arc(agent.x, agent.y, agent.constants.ATTENTION_RADIUS, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.stroke();

			//var r = 1-agent.health/agent.constants.MAX_HEALTH;
			//var g = agent.health/agent.constants.MAX_HEALTH;
			//var b = 0.5;

			// Draw circle
			bmd.ctx.fillStyle = '#999999';//rgb(r,g,b);
			bmd.ctx.beginPath();
			bmd.ctx.arc(agent.x, agent.y, 0.5*agent.fullness + 10, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();
			// Draw direction indicator
			bmd.ctx.strokeStyle = '#FFFFFF';
			bmd.ctx.lineWidth = 5;
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(agent.x, agent.y);
			bmd.ctx.lineTo(agent.x + Math.cos(agent.angle) * agentRadius, agent.y + Math.sin(agent.angle) * agentRadius);
			bmd.ctx.stroke();
		}
	}
}