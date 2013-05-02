function Board(columns, rows) {
	this.rowCount = rows;
	this.columnCount = columns;
}

Board.prototype.isInBounds = function(col, row) {
	return (col >= 0) && (col < this.columnCount) && (row >= 0) && (row < this.rowCount);
};
