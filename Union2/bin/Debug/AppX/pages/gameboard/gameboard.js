// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511

// A mapping of DomElement -> Tile
var CURRENT_LEVEL = new Level();

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/gameboard/gameboard.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            this.WIDTH = 10;
            this.HEIGHT = 6;
            this.theme = new Theme("/images/theme1.png", 9/*numRows*/, 6/*numCols*/, 84, 104);
            this.counter = 0;

            // The padding between tiles (in px)
            var TILE_PADDING = 10;

            for (var i = 0; i < this.WIDTH; i++) {
                for (var j = 0; j < this.HEIGHT; j++) {
                    var tile = new Tile(i, this.theme);
                    var div = tile.CreateDiv();
                    $(div).css("left", i * (this.theme.TileWidth + TILE_PADDING) + "px");
                    $(div).css("top", j * (this.theme.TileHeight + TILE_PADDING) + "px");
                    $(div).appendTo("#gameContainer");
                    CURRENT_LEVEL.GameBoard[div.id] = tile;
                }
            }
            var gameContainerWidth = this.theme.TileWidth * this.WIDTH + (this.WIDTH - 1) * TILE_PADDING;
            var gameContainerHeight = this.theme.TileHeight * this.HEIGHT + (this.HEIGHT - 1) * TILE_PADDING;
            $("#gameContainer").css("marginLeft", -gameContainerWidth / 2 + "px");
            $("#gameContainer").css("marginTop", -gameContainerHeight / 2 + "px");
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
