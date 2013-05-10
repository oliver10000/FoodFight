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
});
