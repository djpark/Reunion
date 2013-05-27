// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511

// A mapping of DomElement -> Tile
var CURRENT_LEVEL;

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/gameboard/gameboard.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            var theme = new Theme("/images/theme2.png", 7/*numRows*/, 5/*numCols*/, 84, 104);

            // If you decide to change this stuff, its really important that you have an even number of tiles.
            // Don't do things like a 3x3 board (9 tiles) can't be matched.

            // Easy is a 4x4 board = 16 tiles = 8 pairs
            $("#easyButton").click(function () {
                $('#audioClick')[0].play();
                $("#difficultySelector").hide();
                CURRENT_LEVEL = new Level(4/*width*/, 4/*height*/, theme, 1/*time*/);
                CURRENT_LEVEL.Begin();
            });

            // Medium is a 6x6 board = 36 tiles = 18 pairs
            $("#mediumButton").click(function () {
                $('#audioClick')[0].play();
                $("#difficultySelector").hide();
                CURRENT_LEVEL = new Level(6/*width*/, 6/*height*/, theme, 4/*time*/);
                CURRENT_LEVEL.Begin();
            });

            // Hard is a 10x6 board = 60 tiles = 30 pairs
            $("#hardButton").click(function () {
                $('#audioClick')[0].play();
                $("#difficultySelector").hide();
                CURRENT_LEVEL = new Level(10/*width*/, 6/*height*/, theme, 4/*time*/);
                CURRENT_LEVEL.Begin();
            });
        },

        unload: function () {
            CURRENT_LEVEL._gameClock.Stop();
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
