describe('Board class', function() {
	
	it('exists', function() {
		expect(new Board).toBeDefined();
	});
	
	it('has rowCount and columnCount properties', function() {
		var board = new Board(10, 12);
		expect(board.rowCount).toEqual(12);
		expect(board.columnCount).toEqual(10);
	});
	
	describe('isInBounds function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(10, 15);
		});
		it('returns true for the center cell', function() {
			expect(board.isInBounds(5, 7)).toBeTruthy();
		});
		it('returns false for a negative row', function() {
			expect(board.isInBounds(4, -1)).toBeFalsy();
		});
		it('returns false for a row too large', function() {
			expect(board.isInBounds(4, 100)).toBeFalsy();
		});
		it('returns false for a negative column', function() {
			expect(board.isInBounds(-2, 8)).toBeFalsy();
		});
		it('returns false for a column too large', function() {
			expect(board.isInBounds(100, 4)).toBeFalsy();
		});
	});
	
	describe('getCellContents function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(10, 15);
		});
		it('returns nil for an out of bounds cell', function() {
			expect(board.getCellContents(-2, 1)).toBeUndefined();
		});
		it('returns nil for a cell that has never been set', function() {
			expect(board.getCellContents(5, 8)).toBeUndefined();
		});
	});
	
	describe('setCellContents function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(8, 12);
		});
		it('adds cell contents to a valid cell', function() {
			var contents = {};
			expect(board.getCellContents(2, 2)).toBeUndefined();
			board.setCellContents(2, 2, contents);
			expect(board.getCellContents(2, 2)).toEqual(contents);
		});
		it('returns old contents', function() {
			var contents = {};
			board.setCellContents(2, 2, contents);
			expect(board.setCellContents(2, 2, {})).toEqual(contents);
		});
	});
	
	describe('compactColumn function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(10, 14);
		});
		it('moves a single hanging cell to the bottom row', function() {
			var toDrop = "this cell should drop";
			board.setCellContents(7, 10, toDrop);
			expect(board.getCellContents(7, 13)).toBeUndefined();
			board.compactColumn(7);
			expect(board.getCellContents(7, 10)).toBeUndefined();
			expect(board.getCellContents(7, 13)).toEqual(toDrop);
		});
		it('collapses all gaps in a column', function() {
			board.setCellContents(3, 2, 'started at 3,2');
			board.setCellContents(3, 5, 'started at 3,5');
			board.compactColumn(3);
			expect(board.getCellContents(3, 2)).toBeUndefined();
			expect(board.getCellContents(3, 5)).toBeUndefined();
			expect(board.getCellContents(3, 12)).toEqual('started at 3,2');
			expect(board.getCellContents(3, 13)).toEqual('started at 3,5');
		});
	});
	
	describe('getCellColumnRow function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(6, 8);
		});
		it('throws an error for an index above range', function() {
			expect(function() { board.getCellColumnRow(board.rowCount * board.columnCount + 1); }).toThrow("Index out of bounds");
		});
		it('throws an error for an index below range', function() {
			expect(function() { board.getCellColumnRow(-1); }).toThrow("Index out of bounds");
		});
		it('returns a 2-element array for a valid index', function() {
			var colRow = board.getCellColumnRow(24);
			expect(colRow.length).toEqual(2);
		});
		it('returns the correct column and row for a valid index', function() {
			var index = board.getCellIndex(5, 7);
			var colRow = board.getCellColumnRow(index);
			expect(colRow[0]).toEqual(5);
			expect(colRow[1]).toEqual(7);
		});
	});
});
