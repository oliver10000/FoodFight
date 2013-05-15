var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var game = new Game(canvas);
game.setBackground('images/background.png');

var update = function() {
	var randCol = Math.random() * game.board.columnCount;
	var randRow = Math.random() * game.board.rowCount;
	game.board.setCellContents(randCol, randRow, {});
	game.stage.update();
};

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
	if (!event.paused) {
		update();
	}
}
