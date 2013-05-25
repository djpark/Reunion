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

    //initializing stuff
    var matchingTiles = true;
    var previousValue = null;
    var selectionSize = 0;

    // check every tile from the SelectedTiles array
    for (var tileId in this.SelectedTiles) {

        // save current value for comparison
        var currentValue = this.SelectedTiles[tileId]._value;

        // check if we're messing with the first tile if not proceed
        if (previousValue != null) {
            matchingTiles = matchingTiles && currentValue == previousValue;
        }

        //one more loop
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

