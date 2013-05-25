/**
 * Tile
 * A class which represents a tile within the game.
 */

// The padding between tiles (in px)
var TILE_PADDING = 10;

var Tile = function (value, gridX, gridY, theme) {

    value = value || 0;

    // The 'value' of this tile, corresponds to which image it shows when flipped.
    this._value = value; // int

    // The state of this tile
    this._flipped = false; // bool

    // The grid position of this tile.
    this._gridX = gridX;
    this._gridY = gridY;

    // The url to the sprite sheet
    this._theme = theme;
};

/**
 * Creates a div for this tile in the appropriate location.
 */
Tile.prototype.CreateDiv = function()
{
    var x = document.createElement("div");
    $(x)
        .width(this._theme.Width + "px")
        .height(this._theme.Height + "px")
        .css("background-image", "url(" + this._theme.ImageUrl + ")")
        .css("background-position", this._theme.GetOffset(this._value))
        .css("left", this._gridX * (this._theme.TileWidth + TILE_PADDING) + "px")
        .css("top", this._gridY * (this._theme.TileHeight + TILE_PADDING) + "px")
        .css("width", this._theme.TileWidth + "px")
        .css("height", this._theme.TileHeight + "px")
        .css("position", "absolute")
        .appendTo("#gameContainer")
        .click(function () {
            $(this).css("background-position", "0px 0px")
        });
};

/**
 * Theme
 * A class representing a theme of the tiles, basically a container for properties.
 */
var Theme = function(url, numRows, numCols, tileWidth, tileHeight)
{
    // The url of the image containing all the tiles.
    this.ImageUrl = url;
    
    // The number of rows in this tile sheet.
    this.NumRows = numRows;

    // The number of columns in this tile sheet.
    this.NumCols = numCols;

    // The width of a specific tile in this tile sheet.
    this.TileWidth = tileWidth;

    // The height of a specific tile within this tile sheet.
    this.TileHeight = tileHeight;
};


// Returns a CSS string to offset the background-position
// to show the 'val'th tile.
Theme.prototype.GetOffset = function(val) {

    var row = Math.floor(val / this.NumCols);
    var col = val % this.NumCols;

    return this.TileWidth * col + "px " + this.TileHeight * row + "px";
};