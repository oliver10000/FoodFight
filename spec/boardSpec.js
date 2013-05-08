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
		it('returns true for (0, 0)', function() {
			expect(board.isInBounds(0, 0)).toBeTruthy();
		});
		it('returns false for (0, rowCount)', function() {
			expect(board.isInBounds(0, board.rowCount)).toBeFalsy();
		});
		it('returns false for (columnCount, 0)', function() {
			expect(board.isInBounds(board.columnCount, 0)).toBeFalsy();
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
		it('throws error when row ordinate is out of bounds', function() {
			expect(function() {
				board.setCellContents(0, board.rowCount, {});
			}).toThrow("Coordinates out of bounds");
		});
		it('throws error when column ordinate is out of bounds', function() {
			expect(function() {
				board.setCellContents(board.columnCount, 0, {});
			}).toThrow("Coordinates out of bounds");
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
	
	describe('getNeighbors function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(8, 10);
		});
		it('throws an error for an index above range', function() {
			expect(function() { board.getNeighbors(board.rowCount * board.columnCount + 1); }).toThrow("Index out of bounds");
		});
		it('throws an error for an index below range', function() {
			expect(function() { board.getNeighbors(-1); }).toThrow("Index out of bounds");
		});
		it('returns only right and bottom for the top-left corner', function() {
			var neighbors = board.getNeighbors(0);
			expect(neighbors.length).toEqual(2);
			expect(neighbors[0]).toEqual(board.rowCount);
			expect(neighbors[1]).toEqual(1);
		});
		it('returns four neighbors for the center cell', function() {
			var neighbors = board.getNeighbors(board.getCellIndex(board.columnCount / 2, board.rowCount / 2));
			expect(neighbors.length).toEqual(4);
		});
		it('returns left, right, top, bottom of the center cell', function() {
			var centerColumn = board.columnCount / 2;
			var centerRow = board.rowCount / 2;
			var centerIndex = board.getCellIndex(centerColumn, centerRow);
			var neighbors = board.getNeighbors(centerIndex);
			expect(neighbors).toContain(centerIndex - board.rowCount); // left
			expect(neighbors).toContain(centerIndex + board.rowCount); // right
			expect(neighbors).toContain(centerIndex - 1); // top
			expect(neighbors).toContain(centerIndex + 1); // bottom
		});
	});

	describe('getConnectedComponents function', function() {
		var board = {};
		beforeEach(function() {
			board = new Board(15, 20);
		});
		it('returns a one-element array for a single cell', function() {
			board.setCellContents(5, 10, {});
			var components = board.getConnectedComponents();
			expect(components.length).toEqual(1);
			expect(components[0]).toEqual([board.getCellIndex(5, 10)]);
		});
		it('returns two components when there are two non-adjacent clusters of cells', function() {
			board.setCellContents(3, 3, 'cluster 1');
			board.setCellContents(3, 4, 'cluster 1');
			board.setCellContents(3, 5, 'cluster 1');
			board.setCellContents(10, 14, 'cluster 2');
			board.setCellContents(11, 14, 'cluster 2');
			board.setCellContents(12, 14, 'cluster 2');
			board.setCellContents(13, 14, 'cluster 2');
			var components = board.getConnectedComponents();
			expect(components.length).toEqual(2);
			var cluster1 = components[0];
			expect(cluster1.length).toEqual(3);
			expect(cluster1).toContain(board.getCellIndex(3, 3));
			expect(cluster1).toContain(board.getCellIndex(3, 4));
			expect(cluster1).toContain(board.getCellIndex(3, 5));
			var cluster2 = components[1];
			expect(cluster2.length).toEqual(4);
			expect(cluster2).toContain(board.getCellIndex(10, 14));
			expect(cluster2).toContain(board.getCellIndex(11, 14));
			expect(cluster2).toContain(board.getCellIndex(12, 14));
			expect(cluster2).toContain(board.getCellIndex(13, 14));
		});
		
		it('can use a custom matching function', function() {
			board.setCellContents(6, 6, 5.2);
			board.setCellContents(6, 5, 5.4);
			board.setCellContents(9, 12, 8.7);
			board.setCellContents(10, 12, 8.8);
			board.setCellContents(11, 12, 8.9);
			var components = board.getConnectedComponents(function(x, y) {
				return Math.floor(x) == Math.floor(y);
			});
			expect(components.length).toEqual(2);
			var component2 = components[1];
			expect(component2.length).toEqual(3);
			expect(component2).toContain(board.getCellIndex(9, 12));
			expect(component2).toContain(board.getCellIndex(10, 12));
			expect(component2).toContain(board.getCellIndex(11, 12));
		});
		
		it('can detect a cluster along the right edge', function() {
			board.setCellContents(board.columnCount - 1, 10, 'RightEdge');
			board.setCellContents(board.columnCount - 1, 11, 'RightEdge');
			board.setCellContents(board.columnCount - 1, 12, 'RightEdge');
			var components = board.getConnectedComponents();
			expect(components.length).toEqual(1);
			var edgeCluster = components[0];
			expect(edgeCluster.length).toEqual(3);
			expect(edgeCluster).toContain(board.getCellIndex(board.columnCount - 1, 10));
			expect(edgeCluster).toContain(board.getCellIndex(board.columnCount - 1, 11));
			expect(edgeCluster).toContain(board.getCellIndex(board.columnCount - 1, 12));
		});
		
		it('can detect a cluster along the bottom edge', function() {
			board.setCellContents(4, board.rowCount - 1, 'BottomEdge');
			board.setCellContents(5, board.rowCount - 1, 'BottomEdge');
			board.setCellContents(6, board.rowCount - 1, 'BottomEdge');
			var components = board.getConnectedComponents();
			expect(components.length).toEqual(1);
			var edgeCluster = components[0];
			expect(edgeCluster.length).toEqual(3);
			expect(edgeCluster).toContain(board.getCellIndex(4, board.rowCount - 1));
			expect(edgeCluster).toContain(board.getCellIndex(5, board.rowCount - 1));
			expect(edgeCluster).toContain(board.getCellIndex(6, board.rowCount - 1));
		});
	});
});
