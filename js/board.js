function Board(columns, rows) {
	this.rowCount = rows;
	this.columnCount = columns;
	this.cells = [];
}

Board.prototype.isInBounds = function(col, row) {
	return (col >= 0) && (col < this.columnCount) && (row >= 0) && (row < this.rowCount);
};

Board.prototype.getCellIndex = function(col, row) {
	return (col * this.rowCount) + row;
};

Board.prototype.getCellContents = function(col, row) {
	var index = this.getCellIndex(col, row);
	return this.cells[index];
};

Board.prototype.setCellContents = function(col, row, contents) {
	var index = this.getCellIndex(col, row);
	var former = this.cells[index];
	this.cells[index] = contents;
	return former;
};

Board.prototype.compactColumn = function(col) {
	var colStart = this.getCellIndex(col, 0);
	var colEnd = this.getCellIndex(col, this.rowCount - 1);
	var bottom = colEnd;
	for (var i = colEnd; i >= colStart; --i) {
		if (this.cells[i]) {
			if (i != bottom) {
				this.cells[bottom] = this.cells[i];
				this.cells[i] = undefined;
			}
			bottom--;
		}
	}
};
