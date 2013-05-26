// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/scoreboard/scoreboard.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            
            loadGamesFromLocalFolder();

            // Add the click handlers for Clear Scores
            $("#clearScoreBoardButton").click(function () {
                var gameManager = new GameManager();
                gameManager.ClearGames();

                // TO FIX: Trying to refresh the games after clear games causes an async access error.
                //loadGamesFromLocalFolder();
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });

    function loadGamesFromLocalFolder() {
        // Load in game data from applicationdata
        var applicationData = Windows.Storage.ApplicationData.current;
        var localFolder = applicationData.localFolder;
        localFolder.getFileAsync("gamedata.txt")
            .then(function (sampleFile) {
                return Windows.Storage.FileIO.readTextAsync(sampleFile);
            })
            .done(function (gotscores) {
                // JSON.parse bombs out if gotscores is ever empty so convert to empty array instead
                if (gotscores == "")
                    gotscores = "[]";

                var scores = JSON.parse(gotscores);

                // Append the game data to the scoreboard
                for (var i = 0; i < scores.length; i++) {
                    var x = document.createElement("p");
                    $(x).html("<b>Time Elapsed:</b> " + scores[i].timeElapsed + " <b>Number Of Moves:</b> " + scores[i].numberOfMoves)
                        .appendTo("#scoreboard");
                }
            }, function () {

            });
    }
})();
