function BoardRenderer(board, stage) {
	this.board = board;
	this.stage = stage;
	this.cellRenderers = [];
	this.board.addEventListener('cellContentsChanged', this);
	
	var cellWidth = stage.canvas.width / board.columnCount;
	var cellHeight = stage.canvas.height / board.rowCount;
	
	this.cellWidth = (cellHeight < cellWidth) ? cellHeight : cellWidth;
	this.cellHeight = this.cellWidth;

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
	g.beginFill(cellContents.color);
	var halfCellWidth = this.cellWidth / 2;
	var halfCellHeight = this.cellHeight / 2;
	var radius = (halfCellHeight < halfCellWidth) ? halfCellHeight : halfCellWidth;
	var x = (column * this.cellWidth) + halfCellWidth;
	var y = (row * this.cellHeight) + halfCellHeight;
	g.drawCircle(0, 0, radius);
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
