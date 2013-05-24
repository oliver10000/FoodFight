function Game(canvas) {
	this.stage = new createjs.Stage(canvas);

	this.board = new Board(6, 12);
	this.boardRenderer = new BoardRenderer(this.board, this.stage);
	
	this.running = false;
	
	this.lastTime = 0;
	
	this.drop = null;

	this.update = function() {
		if (this.isRunning()) {
			var time = createjs.Ticker.getTime(true);
			if (this.lastTime > 0) {
				var deltaMillis = time - this.lastTime;
				if (this.drop) {
					this.drop.y += 15 * (deltaMillis / 1000);
				}
				//var randCol = Math.random() * this.board.columnCount;
				//var randRow = Math.random() * this.board.rowCount;
				//this.board.setCellContents(randCol, randRow, {});
			}
			this.lastTime = time;
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
	
	this.drop = this.boardRenderer.createCellRenderer(4, 0, {});
	this.stage.addChild(this.drop);
};

Game.prototype.stop = function() {
	this.running = false;
};
