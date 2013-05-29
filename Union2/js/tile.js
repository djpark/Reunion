var CARD_COLORS = ["#208c9f", "#aa5c00", "#b39436", "#778d21", "#8b8b8b"];

/**
 * Tile
 * A class which represents a tile within the game.
 */
var Tile = function (value, theme, tileId) {

    // The 'value' of this tile, corresponds to which image it shows when flipped.
    this._value = value;

    // The state of this tile
    this._flipped = false;

    // The url to the sprite sheet
    this._theme = theme;

    // This tile has been completed.
    this._complete = false;

    // The ID of this tile
    this._tileId = tileId;

    this._colorIndex = Math.floor(Math.random() * (CARD_COLORS.length));
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
        .css("background-color", CARD_COLORS[this._colorIndex])
        .css("background-image", "url(" + this._theme.ImageUrl + ")")
        .css("width", this._theme.TileWidth + "px")
        .css("height", this._theme.TileHeight + "px")
        .css("position", "absolute")
        .css("top", window.outerHeight + "px")
        .css("left", window.outerWidth + "px")
        .attr("id", this._tileId)
        .click(function () {
            CURRENT_LEVEL.OnClick(this.id);
        });

    return x;
};

/**
 * Some fun stuff in order to have the cards kinda slide in, we have to set the properties slightly after creation.
 */
Tile.prototype.RevealDiv = function(leftIndex, topIndex) {
    var that = this;
    setTimeout(function () {
        that.PositionDiv(leftIndex, topIndex);
    }, this._tileId * 15);
};

Tile.prototype.PositionDiv = function (leftIndex, topIndex) {
    $("#" + this._tileId).css("left", leftIndex * (this._theme.TileWidth + TILE_PADDING) + "px");
    $("#" + this._tileId).css("top", topIndex * (this._theme.TileHeight + TILE_PADDING) + "px");
};

Tile.prototype.Flip = function() {
    this._flipped = !this._flipped;

    if (this._flipped) {
        $("#" + this._tileId).css("background-position", this._theme.GetOffset(this._value));
        $("#" + this._tileId).css("transform", "rotateY(180deg) scaleX(-1)");
        $("#" + this._tileId).css("background-color", "#e6e6e6");

    }
    else {
        $("#" + this._tileId).css("background-position", "0px 0px");
        $("#" + this._tileId).css("transform", "rotateY(0deg) scaleX(1)");
        $("#" + this._tileId).css("background-color", CARD_COLORS[this._colorIndex]);
    }
};

Tile.prototype.Complete = function () {
    this._complete = true;
    $("#" + this._tileId).css("opacity", "0");
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

    var left = this.TileWidth * col;
    var top = this.TileHeight * row;

    return -left + "px " + -top + "px";
};