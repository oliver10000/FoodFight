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
		var board = new Board(10, 15);
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
});
