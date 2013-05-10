function Board(columns, rows) {
	this.rowCount = rows;
	this.columnCount = columns;
	this.cells = [];
	createjs.EventDispatcher.initialize(Board.prototype);
}

Board.prototype.isInBounds = function(col, row) {
	return (col >= 0) && (col < this.columnCount) && (row >= 0) && (row < this.rowCount);
};

Board.prototype.getCellIndex = function(col, row) {
	return (col * this.rowCount) + row;
};

Board.prototype.getCellColumnRow = function(index) {
	if (index < 0 || index >= (this.rowCount * this.columnCount)) {
		throw new Error("Index out of bounds");
	}
	var col = Math.floor(index / this.rowCount);
	var row = index % this.rowCount;
	return [col, row];
};

Board.prototype.getNeighbors = function(index) {
	var colRow = this.getCellColumnRow(index);
	var col = colRow[0];
	var row = colRow[1];
	var neighbors = [];
	if (col >= 1) {
		neighbors.push(this.getCellIndex(col - 1, row));
	}
	if (col < (this.columnCount - 1)) {
		neighbors.push(this.getCellIndex(col + 1, row));
	}
	if (row >= 1) {
		neighbors.push(this.getCellIndex(col, row - 1));
	}
	if (row < (this.rowCount - 1)) {
		neighbors.push(this.getCellIndex(col, row + 1));
	}
	return neighbors;
};

Board.prototype.getCellContents = function(col, row) {
	var index = this.getCellIndex(col, row);
	return this.cells[index];
};

Board.prototype.setCellContents = function(col, row, contents) {
	if (!this.isInBounds(col, row)) {
		throw new Error("Coordinates out of bounds");
	}
	var index = this.getCellIndex(col, row);
	var former = this.cells[index];
	this.cells[index] = contents;
	this.dispatchEvent({type:"cellContentsChanged", column:col, row:row});
	return former;
};

Board.prototype.compactColumn = function(col) {
	var colStart = this.getCellIndex(col, 0);
	var colEnd = this.getCellIndex(col, this.rowCount - 1);
	var bottom = colEnd;
	for (var i = colEnd; i >= colStart; --i) {
		if (this.cells[i]) {
			if (i != bottom) {
				this.setCellContents(col, bottom - colStart, this.cells[i]);
				this.setCellContents(col, i - colStart, undefined);
			}
			bottom--;
		}
	}
};

Board.prototype.visitConnectedComponent = function(column, row, matchContents, matcher, seen, component) {
	var index = this.getCellIndex(column, row);
    if (seen[index]) {
        return;
    }
    if (typeof(matcher) != 'undefined' ? !matcher(this.cells[index], matchContents) : this.cells[index] != matchContents) {
    	return;
    }
    seen[index] = true;
    component.push(index);
    if (column > 0) {
    	this.visitConnectedComponent(column - 1, row, matchContents, matcher, seen, component);
    }
    if (row > 0) {
    	this.visitConnectedComponent(column, row - 1, matchContents, matcher, seen, component);
    }
	if (column < (this.columnCount - 1)) {
		this.visitConnectedComponent(column + 1, row, matchContents, matcher, seen, component);
	}
	if (row < (this.rowCount - 1)) {
		this.visitConnectedComponent(column, row + 1, matchContents, matcher, seen, component);
	}
};

Board.prototype.getConnectedComponents = function(matcher) {
	var components = [];
	var seen = {};
	var end = this.rowCount * this.columnCount;
	for (var i = 0; i < end; ++i) {
		if (this.cells[i] == undefined) {
			continue;
		}
		if (seen[i]) {
			continue;
		}
		var colRow = this.getCellColumnRow(i);
		var component = [];
		this.visitConnectedComponent(colRow[0], colRow[1], this.cells[i], matcher, seen, component);
		components.push(component);
	}
	return components;
};
