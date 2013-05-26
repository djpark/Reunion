/**
 * Level
 * A class which represents a level.
 */

// The padding between tiles (in px)
var TILE_PADDING = 10;
var TILE_FLIP_DELAY = 1000;

var Level = function (width, height, theme) {
    // An array mapping TileID (string) to Tile.
    this.GameBoard = new Array();

    // An array of all the tiles you have currently selected.
    this.SelectedTiles = new Array();

    // The width (in number of tiles) of this level.
    this._width = width;

    // The height of this level (in number of tiles)
    this._height = height;

    // The graphical theme of this level.
    this._theme = theme;

    // It's a thread and it's busy.. sometimes
    this._threadBusy = false;
};

Level.prototype.Begin = function() {
    for (var i = 0; i < this._width; i++) {
        for (var j = 0; j < this._height; j++) {
            var tile = new Tile(i + 1, this._theme);
            var div = tile.CreateDiv();
            $(div).appendTo("#gameContainer");
            CURRENT_LEVEL.GameBoard[div.id] = tile;
            tile.PositionDiv(i, j);
        }
    }
    var gameContainerWidth = this._theme.TileWidth * this._width + (this._width - 1) * TILE_PADDING;
    var gameContainerHeight = this._theme.TileHeight * this._height + (this._height - 1) * TILE_PADDING;
    $("#gameContainer").css("marginLeft", -gameContainerWidth / 2 + "px");
    $("#gameContainer").css("marginTop", -gameContainerHeight / 2 + "px");
    this.ShuffleBoard();
};

/**
 * The main OnClick function for a level.
 * Takes in the ID of the tile which was most recently clicked.
 */
Level.prototype.OnClick = function (tileId) {
    // Don't do anything if we're waiting to flip back
    if (this._threadBusy)
        return;
    
    // Don't do anything if we clicked a completed tile.
    if (this.GameBoard[tileId]._complete)
        return;

    // Flip it if we haven't flipped it yet.
    if (this.SelectedTiles[tileId] == null) {
        this.GameBoard[tileId].Flip();
    }

    // This makes an array of selected tiles, but if you clicked the same one twice it doesn't add it.
    this.SelectedTiles[tileId] = this.GameBoard[tileId];

    // Do we have a match?
    if (this.AreSelectedTilesSame()) {
        // Mark all selected tiles as complete.
        for (var tileId in this.SelectedTiles) {
            this.SelectedTiles[tileId].Complete();
        }

        // Clean out your current selection
        this.SelectedTiles = new Array();

        if (this.IsGameOver()) {
            $('#pagetitle').text("RICHARD PARKER MOTHERFUCKER");
        };
    }
    // We don't have a match
    else {
        // Check if we are working on our 2nd tile
        if (this.NonNullLength(this.SelectedTiles) == 2) {

            // in 2 seconds we want the cards to flip back
            var that = this;
            this._threadBusy = true;
            setTimeout(function () {

                // flip back everything since we didn't get a match
                for (var tileId in that.SelectedTiles) {
                    if (that.SelectedTiles[tileId] != null) {
                        that.SelectedTiles[tileId].Flip();
                    }
                }

                //clear the array
                that.SelectedTiles = new Array();
                that._threadBusy = false;
            }, TILE_FLIP_DELAY);
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
    // walk through the gameboard and make sure they are all complete
    for (var tileID in this.GameBoard) {

        // if any if the tiles are incomplete the game is not complete and we return
        if (!this.GameBoard[tileID]._complete)
            return false
    }

    // Register the game stats to the game manager
    var gameManager = new GameManager();
    gameManager.AddGameEntry(100, 100);

    //if we're here it's because the game is complete
    return true;
}

Level.prototype.NonNullLength = function (myArray) {
    return Object.keys(myArray).length;
};


/**
 * Shuffle the board
 */
Level.prototype.ShuffleBoard = function () {

    var shuffleBoard = new Array(this.GameBoard.length);

    for (var i = 0; i < this.GameBoard.length; i++) {
        var randomPosition = Math.round(Math.random() * (this.GameBoard.length - 1));

        while (shuffleBoard[randomPosition] != null)
            randomPosition = ++randomPosition % this.GameBoard.length;

        var top = Math.floor(i / this._width);
        var left = Math.floor(i % this._width);

        this.GameBoard[randomPosition].PositionDiv(left, top);

        shuffleBoard[randomPosition] = true;
    }
};