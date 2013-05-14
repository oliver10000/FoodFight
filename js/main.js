var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var game = new Game(canvas);
game.setBackground('images/background.png');

var update = function() {
	var randCol = Math.random() * board.columnCount;
	var randRow = Math.random() * board.rowCount;
	board.setCellContents(randCol, randRow, {});
	game.stage.update();
};

var board = new Board(6, 12);
var boardRenderer = new BoardRenderer(board, game.stage);

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
	if (!event.paused) {
		update();
	}
}
