﻿/**
 * Level
 * A class which represents a level.
 */

// The padding between tiles (in px)
var TILE_PADDING = 10;

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
};

Level.prototype.Begin = function() {
    for (var i = 0; i < this._width; i++) {
        for (var j = 0; j < this._height; j++) {
            var tile = new Tile(i, this._theme);
            var div = tile.CreateDiv();
            $(div).css("left", i * (this._theme.TileWidth + TILE_PADDING) + "px");
            $(div).css("top", j * (this._theme.TileHeight + TILE_PADDING) + "px");
            $(div).appendTo("#gameContainer");
            CURRENT_LEVEL.GameBoard[div.id] = tile;
        }
    }
    var gameContainerWidth = this._theme.TileWidth * this._width + (this._width - 1) * TILE_PADDING;
    var gameContainerHeight = this._theme.TileHeight * this._height + (this._height - 1) * TILE_PADDING;
    $("#gameContainer").css("marginLeft", -gameContainerWidth / 2 + "px");
    $("#gameContainer").css("marginTop", -gameContainerHeight / 2 + "px");
};

/**
 * The main OnClick function for a level.
 * Takes in the ID of the tile which was most recently clicked.
 */
Level.prototype.OnClick = function (tileId) {

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
            window.history.back();
        };
    }
    // We don't have a match
    else {
        // Check if we are working on our 2nd tile
        if (this.NonNullLength(this.SelectedTiles) == 2) {

            // flip back everything since we didn't get a match
            for (var tileId in this.SelectedTiles) {
                if (this.SelectedTiles[tileId] != null) {
                    this.SelectedTiles[tileId].Flip();
                }
            }

            // Clean out your current selection
            this.SelectedTiles = new Array();
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

Level.prototype.NonNullLength = function (myArray) {
    return Object.keys(myArray).length;
};