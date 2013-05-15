function Game(canvas) {
	this.stage = new createjs.Stage(canvas);

	this.board = new Board(6, 12);
	this.boardRenderer = new BoardRenderer(this.board, this.stage);
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
