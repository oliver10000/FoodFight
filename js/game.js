function Game(canvas) {
	this.stage = new createjs.Stage(canvas);
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
