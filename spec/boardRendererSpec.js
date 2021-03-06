describe('BoardRenderer class', function() {

	var canvas = document.createElement("canvas");
	canvas.width = 400;
	canvas.height = 600;

	var stage = {};
	var board = {};
	var boardRenderer = {};
	
	beforeEach(function() {
		stage = new createjs.Stage(canvas);
		board = new Board(10, 15);
		boardRenderer = new BoardRenderer(board, stage);
	});
	
	it('adds a display object when cell contents are initially set', function() {
		board.setCellContents(5, 5, {});
		expect(stage.getNumChildren()).toEqual(1);
	});
	
	it('removes existing cell renderer when contents change', function() {
		board.setCellContents(5, 5, {});
		board.setCellContents(5, 5, {});
		expect(stage.getNumChildren()).toEqual(1);
	});
	
	it('removes the renderer when a cell is cleared by setting it to undefined', function() {
		board.setCellContents(5, 5, {});
		expect(stage.getNumChildren()).toEqual(1);
		board.setCellContents(5, 5, undefined);
		expect(stage.getNumChildren()).toEqual(0);
	});
	
	it('bases cell width and height on board and canvas sizes', function() {
		expect(boardRenderer.cellWidth).toEqual(stage.canvas.width / board.columnCount);
		expect(boardRenderer.cellHeight).toEqual(stage.canvas.height / board.rowCount);
	});
	
	describe('hasCellRenderer function', function() {
		it('returns false when board is empty', function() {
			for (var i = 0; i < (board.rowCount * board.columnCount); ++i) {
				expect(boardRenderer.hasCellRenderer(i)).toBeFalsy();
			}
		});
		
		it('returns true when a cell is set', function() {
			board.setCellContents(6, 8, {});
			expect(boardRenderer.hasCellRenderer(board.getCellIndex(0, 0))).toBeFalsy();
			expect(boardRenderer.hasCellRenderer(board.getCellIndex(6, 8))).toBeTruthy();
		});
	});
	
	describe('getTopOfColumn', function() {
		it('returns the bottom of the canvas when a column is empty', function() {
			expect(boardRenderer.getTopOfColumn(3)).toEqual(stage.canvas.height);
		});
		it('returns the height of a single cell when a column has one cell', function() {
			board.setCellContents(4, board.rowCount - 1, {});
			expect(boardRenderer.getTopOfColumn(4)).toEqual(canvas.height - boardRenderer.cellHeight);
		});
		it('returns the top of the canvas when a column is full', function() {
			for (var i = 0; i < board.rowCount; ++i) {
				board.setCellContents(2, i, {});
			}
			expect(boardRenderer.getTopOfColumn(2)).toEqual(0);
		});
	});
});
