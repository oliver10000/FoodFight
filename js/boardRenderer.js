function BoardRenderer(board, stage) {
	this.board = board;
	this.stage = stage;
	this.cellRenderers = [];
	this.board.addEventListener('cellContentsChanged', this);
	this.cellWidth = stage.canvas.width / board.columnCount;
	this.cellHeight = stage.canvas.height / board.rowCount;

	this.handleEvent = function(event) {
		if (this.hasCellRenderer(event.index)) {
			this.stage.removeChild(this.cellRenderers[event.index]);
		}
		var newContents = this.board.getCellContents(event.column, event.row);
		if (typeof(newContents) != 'undefined') {
			var cellRenderer = this.createCellRenderer(event.column, event.row, newContents);
			this.cellRenderers[event.index] = cellRenderer;
			this.stage.addChild(cellRenderer);
		}
	};
}

BoardRenderer.prototype.createCellRenderer = function(column, row, cellContents) {
	var g = new createjs.Graphics();
	g.setStrokeStyle(1);
	g.beginStroke(createjs.Graphics.getRGB(0,0,255,1));
	var halfCellWidth = this.cellWidth / 2;
	var halfCellHeight = this.cellHeight / 2;
	var x = (column * this.cellWidth) + halfCellWidth;
	var y = (row * this.cellHeight) + halfCellHeight;
	g.drawCircle(0, 0, (halfCellHeight < halfCellWidth) ? halfCellHeight : halfCellWidth);
	g.endStroke();
	var s = new createjs.Shape(g);
	s.x = x;
	s.y = y;
	return s;
};

BoardRenderer.prototype.hasCellRenderer = function(index) {
	return typeof(this.cellRenderers[index]) != 'undefined';
};

BoardRenderer.prototype.getTopOfColumn = function(column) {
	return this.stage.canvas.height - (this.board.countCellsInColumn(column) * this.cellHeight);
};
