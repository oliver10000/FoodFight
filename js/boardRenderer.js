function BoardRenderer(board, stage) {
	this.board = board;
	this.stage = stage;
	this.cellRenderers = [];
	this.board.addEventListener('cellContentsChanged', this);
}

BoardRenderer.prototype.handleEvent = function(event) {
	if (this.hasCellRenderer(event.index)) {
		this.stage.removeChild(this.cellRenderers[event.index]);
	}
	var cellRenderer = this.createCellRenderer(this.board.getCellContents(event.column, event.row));
	this.cellRenderers[event.index] = cellRenderer;
	this.stage.addChild(cellRenderer);
};

BoardRenderer.prototype.createCellRenderer = function(cellContents) {
	var cellRenderer = new createjs.Shape();
	return cellRenderer;
};

BoardRenderer.prototype.hasCellRenderer = function(index) {
	return typeof(this.cellRenderers[index]) != 'undefined';
};
