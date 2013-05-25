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

Level.prototype.AreSelectedTilesSame = function () {

    // initialize shiet
    var lastVal = null;
    var counter = 0;

    // go through the array
    if (this.SelectedTiles.length > 1)
    {
        this.SelectedTiles.forEach(function (currentSelectedTile) {
        
            // unless it's the 2nd item we have nothing to compare
            if (counter === 1) {
                return (lastVal === this.GameBoard[currentSelectedTile]._value);
            }

            // store the first item for the next iteration
            lastVal = this.GameBoard[currentSelectedTile].Value;
            counter++;
        })
    }
    else
    {
        return false;
    }
}

Level.prototype.CheckWin = function () {

}