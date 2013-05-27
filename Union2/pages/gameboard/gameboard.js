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
            $("#easyButton").click(function () {
                $("#difficultySelector").hide();
                CURRENT_LEVEL = new Level(4/*width*/, 4/*height*/, theme, 4/*time*/);
                CURRENT_LEVEL.Begin();
            });

            $("#mediumButton").click(function () {
                $("#difficultySelector").hide();
                CURRENT_LEVEL = new Level(6/*width*/, 6/*height*/, theme, 4/*time*/);
                CURRENT_LEVEL.Begin();
            });

            $("#hardButton").click(function () {
                $("#difficultySelector").hide();
                CURRENT_LEVEL = new Level(10/*width*/, 6/*height*/, theme, 4/*time*/);
                CURRENT_LEVEL.Begin();
            });
            // TODO: Initialize the page here.
          //  
          //  CURRENT_LEVEL = new Level(2, 2, theme, 3/*timeLimit*/);
           // CURRENT_LEVEL.Begin();
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
