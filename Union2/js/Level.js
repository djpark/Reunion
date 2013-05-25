/**
 * Level
 * A class which represents a level.
 */
var Level = function () {
    // An array mapping TileID (string) to Tile.
    this.GameBoard = new Array();

    // An array of all the tiles you have currently selected.
    this.SelectedTiles = new Array();
};

/**
 * The main OnClick function for a level.
 * Takes in the ID of the tile which was most recently clicked.
 */
Level.prototype.OnClick = function (tileId) {
    // This makes an array of selected tiles, but if you clicked the same one twice it doesn't add it.
    this.SelectedTiles[tileId] = tileId;

    // This is the Tile associated with tileId
    this.GameBoard[tileId];
};