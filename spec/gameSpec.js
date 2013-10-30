describe('Game class', function() {

    var canvas;

    beforeEach(function () {
	canvas = document.createElement("gameSpecCanvas");
	canvas.width = 400;
	canvas.height = 600;
    });

	it('exists', function() {
		expect(Game.prototype).toBeDefined();
	});
	
	it('has a stage property', function() {
		var game = new Game(canvas);
		expect(game.stage).toBeDefined();
	});
	
	describe('setBackground function', function() {
		it('adds a display object when given a string', function() {
			var game = new Game(canvas);
			expect(game.stage.getNumChildren()).toEqual(0);
			game.setBackground("images/background.png");
			expect(game.stage.getNumChildren()).toEqual(1);
		});
		it('when given an object, adds it to the stage', function() {
			var game = new Game(canvas);
			expect(game.stage.getNumChildren()).toEqual(0);
			game.setBackground(new createjs.Bitmap("images/background.png"));
			expect(game.stage.getNumChildren()).toEqual(1);
		});
	});
	
	describe('start function', function() {
		it('starts the game', function() {
			var game = new Game(canvas);
			expect(game.isRunning()).toBeFalsy();
			game.start();
			expect(game.isRunning()).toBeTruthy();
		});
	});
	
	describe('stop function', function() {
		it('stops the game', function() {
			var game = new Game(canvas);
			game.start();
			expect(game.isRunning()).toBeTruthy();
			game.stop();
			expect(game.isRunning()).toBeFalsy();
		});
	});
});
