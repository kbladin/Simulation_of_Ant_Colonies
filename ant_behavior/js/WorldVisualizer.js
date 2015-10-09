//
// WorldVisualizer
//

function WorldVisualizer (world, width, height) {
	var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
	var bmd;
	var bitmapSprite;
	
	function preload() {

	}
	
	function create() {
        bmd = game.add.bitmapData(width, height);
        bitmapSprite = game.add.sprite(0, 0, bmd);
	}

	function rgb(r,g,b){
		return'rgb(' + r + ',' + g + ',' + b + ')';
	}

	function rgba(r,g,b,a){
		return'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
	}
	
	function update() {		
		bmd.clear(0,0,width, height);
		
		bmd.ctx.fillStyle = rgb(219, 184, 77);
		bmd.ctx.beginPath();
		bmd.ctx.fillRect(0, 0, width, height);
		bmd.ctx.closePath();
		bmd.ctx.fill();

		var antRadius = 3;

		var dw = width / world.width;
		var dh = height / world.height;

		// Draw pheromones
		for (var i = 0; i < world.width; i++) {
			for (var j = 0; j < world.height; j++) {
				var xPos = dw * i - 0.5 * dw;
				var yPos = dh * j - 0.5 * dh;

				if (world.food[i][j] > 0) {
					bmd.ctx.fillStyle = rgb(0,150,0);
					bmd.ctx.beginPath();
					bmd.ctx.fillRect(xPos, yPos, dw, dh);
					bmd.ctx.closePath();
					bmd.ctx.fill();
				};


				for (var k = 0; k < world.anthills.length; k++) {
					if(world.anthills[k].nest[i][j] > 0){
						bmd.ctx.fillStyle = rgb(150,100,50);
						bmd.ctx.beginPath();
						bmd.ctx.fillRect(xPos, yPos, dw, dh);
						bmd.ctx.closePath();
						bmd.ctx.fill();
					};

					// PHEROMONES
					if (world.anthills[k].homePheromones[i][j] > 0) {
						var intensity = world.anthills[k].homePheromones[i][j].toFixed(5);
						bmd.ctx.fillStyle = "rgba(250,250,0," + intensity + ")";
						bmd.ctx.beginPath();
						bmd.ctx.fillRect(xPos, yPos, dw, dh);
						bmd.ctx.closePath();
						bmd.ctx.fill();
					};

					if (world.anthills[k].foodPheromones[i][j] > 0) {
						var intensity = world.anthills[k].foodPheromones[i][j].toFixed(5);
						bmd.ctx.fillStyle = "rgba(0,250,255," + intensity + ")";
						bmd.ctx.beginPath();
						bmd.ctx.fillRect(xPos, yPos, dw, dh);
						bmd.ctx.closePath();
						bmd.ctx.fill();
					};

					if (world.anthills[k].exitPheromones[i][j] > 0) {
						var intensity = world.anthills[k].homePheromones[i][j].toFixed(5);
						bmd.ctx.fillStyle = "rgba(250,0,0," + intensity + ")";
						bmd.ctx.beginPath();
						bmd.ctx.fillRect(xPos, yPos, dw, dh);
						bmd.ctx.closePath();
						bmd.ctx.fill();
					};
				};
			};			
		};

		for (var i = 0; i < world.anthills.length; i++) {
			var anthill = world.anthills[i]
			bmd.ctx.fillStyle = rgb(255,0,0);
			bmd.ctx.beginPath();
			bmd.ctx.fillRect(anthill.x*dw, anthill.y*dh, dw, dh);
			bmd.ctx.closePath();
			bmd.ctx.fill();
		};
		// Draw ants
		for (var i = 0; i < world.ants.length; i++) {
			var ant = world.ants[i];

			var xPos = dw * ant.x;
			var yPos = dh * ant.y;

			// Draw circle
			if(ant.carryingFood){
				bmd.ctx.fillStyle = '#FF9900';
			}
			else if(ant.carryingDirt){
				bmd.ctx.fillStyle = '#999999';
			}
			else if(ant.lostInsideNest){
				bmd.ctx.fillStyle = '#FF00FF';
			}
			else{
				bmd.ctx.fillStyle = '#333333';
			}
			bmd.ctx.beginPath();
			bmd.ctx.arc(xPos, yPos, antRadius, 0, Math.PI*2, true); 
			bmd.ctx.closePath();
			bmd.ctx.fill();

			// Draw direction indicator
			if(ant.insideNest)
				bmd.ctx.strokeStyle = '#000000';
			else
				bmd.ctx.strokeStyle = '#9999FF';

			bmd.ctx.lineWidth = 5;
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(xPos, yPos);
			bmd.ctx.lineTo(xPos + Math.cos(ant.angle / 7 * 2*Math.PI) * antRadius, yPos + Math.sin(ant.angle / 7 * 2*Math.PI) * antRadius);
			bmd.ctx.stroke();
		}
	}
}