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
            this.HEIGHT = 5;
            this.theme = new Theme("/images/theme1.png", 9/*numRows*/, 6/*numCols*/, 33, 56);
            this.counter = 0;

            for (var i = 0; i < this.WIDTH; i++) {
                for (var j = 0; j < this.HEIGHT; j++) {
                    var tile = new Tile(this.counter++, i, j, this.theme);
                    var div = tile.CreateDiv();
                    CURRENT_LEVEL.GameBoard[div] = tile;
                }
            }
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
