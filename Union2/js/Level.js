/**
 * Level
 * A class which represents a level.
 */
var Level = function () {
    this.GameBoard = [];
    this.SelectedTiles = [];
};

/**
 * A function which is the callback when we click on the passed in dom element.
 */
Level.prototype.OnClick = function (domElement) {
    
    // This makes an array of selected tiles, but if you clicked the same one twice it doesn't.
    this.SelectedTiles[domElement] = domElement;
    this.GameBoard[domElement];
};