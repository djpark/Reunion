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
    this.SelectedTiles[tileId] = this.GameBoard[tileId];
    this.SelectedTiles[tileId].Flip();

    if (this.AreSelectedTilesSame()) {
        for (var tileId in this.SelectedTiles) {
            this.SelectedTiles[tileId].Complete();
        }
    }
};

Level.prototype.AreSelectedTilesSame = function () {
    var matchingTiles = true;
    var previousValue = null;
    var selectionSize = 0;
    for (var tileId in this.SelectedTiles) {
        var currentValue = this.SelectedTiles[tileId]._value;
        if (previousValue != null) {
            matchingTiles = matchingTiles && currentValue == previousValue;
        }
        previousValue = currentValue;
        selectionSize++;
    }
    return selectionSize > 1 && matchingTiles;
};

Level.prototype.IsGameOver = function () {

    //initialize stuff
    var gameComplete = true;

    // walk through the gameboard and make sure they are all complete
    for (var tile in this.GameBoard) {

        // if any if the tiles are incomplete the game is not complete
        if (!tile._complete)
            gameComplete = false;
    }

    return gameComplete;
}