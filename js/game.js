function Game(canvas) {
	this.stage = new createjs.Stage(canvas);

	this.board = new Board(6, 12);
	this.boardRenderer = new BoardRenderer(this.board, this.stage);
	
	this.running = false;

	this.update = function() {
		if (this.isRunning()) {
			var randCol = Math.random() * this.board.columnCount;
			var randRow = Math.random() * this.board.rowCount;
			this.board.setCellContents(randCol, randRow, {});
		}
		this.stage.update();
	};

	this.handleEvent = function(event) {
		if (!event.paused) {
			this.update();
		}
	};

	createjs.Ticker.addEventListener("tick", this);
}

Game.prototype.setBackground = function(background) {
	if (typeof(background) == 'string') {
		var bgBitmap = new createjs.Bitmap(background);
		this.stage.addChild(bgBitmap);
	}
	else {
		this.stage.addChild(background);
	}
};

Game.prototype.isRunning = function() {
	return this.running;
};

Game.prototype.start = function() {
	this.running = true;
};

Game.prototype.stop = function() {
	this.running = false;
};
