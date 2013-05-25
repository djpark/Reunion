/**
 * Tile
 * A class which represents a tile within the game.
 */

// A static int used to uniquely identify tiles.
var s_numTiles = 0;

var Tile = function (value, theme) {

    value = value || 0;

    // The 'value' of this tile, corresponds to which image it shows when flipped.
    this._value = value;

    // The state of this tile
    this._flipped = false;

    // The url to the sprite sheet
    this._theme = theme;

    // This tile has been completed.
    this._complete = false;

    this._tileId = s_numTiles++;
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
        .addClass("tile")
        .css("background-image", "url(" + this._theme.ImageUrl + ")")
        .css("width", this._theme.TileWidth + "px")
        .css("height", this._theme.TileHeight + "px")
        .css("position", "absolute")
        .attr("id", this._tileId)
        .click(function () {
            CURRENT_LEVEL.OnClick(this.id);
        });
    return x;
};

Tile.prototype.Flip = function() {
    this._flipped = !this._flipped;
    if (this._flipped)
        $("#" + this._tileId).css("background-position", this._theme.GetOffset(this._value));
    else
        $("#" + this._tileId).css("background-position", "0px 0px");
};

Tile.prototype.Complete = function () {
    this._complete = true;
    $("#" + this._tileId).hide();
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