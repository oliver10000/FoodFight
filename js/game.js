function Game(canvas) {
	this.stage = new createjs.Stage(canvas);

	this.board = new Board(8, 12);
	this.boardRenderer = new BoardRenderer(this.board, this.stage);
	
	this.running = false;
	
	this.drop = null;
	
	this.colors = ['#FF0000', '#00CC00', '#0000FF', '#FFFF00', '#FF6600'];

	this.update = function(delta) {
		if (this.isRunning()) {
			if (this.drop) {
				this.drop.y += 50 * (delta / 1000);
				if ((this.drop.y + (this.boardRenderer.cellHeight / 2)) > this.boardRenderer.getTopOfColumn(this.drop.column)) {
					var row = this.board.rowCount - this.board.countCellsInColumn(this.drop.column) - 1;
					this.board.setCellContents(this.drop.column, row, {color:this.drop.color});
					this.stage.removeChild(this.drop);
					this.drop = null;
					this.spawnDroppingPiece();
				}
			}
		}
		this.stage.update();
	};

	this.handleEvent = function(event) {
		if (!event.paused) {
			this.update(event.delta);
		}
	};
	
	this.spawnDroppingPiece = function() {
		var randCol = Math.floor(Math.random() * this.board.columnCount);
		var randColorIndex = Math.floor(Math.random() * this.colors.length);
		var randColor = this.colors[randColorIndex];
		this.drop = this.boardRenderer.createCellRenderer(randCol, -1, {color:randColor});
		this.drop.column = randCol;
		this.drop.color = randColor;
		this.stage.addChild(this.drop);
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
	
	this.spawnDroppingPiece();
};

Game.prototype.stop = function() {
	this.running = false;
};
