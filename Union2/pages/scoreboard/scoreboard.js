// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var GamesPlayed = new Array();

    WinJS.UI.Pages.define("/pages/scoreboard/scoreboard.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            
            // Load in game data from applicationdata
            var applicationData = Windows.Storage.ApplicationData.current;
            var localFolder = applicationData.localFolder;
            localFolder.getFileAsync("gamedata.txt")
                .then(function (sampleFile) {
                    return Windows.Storage.FileIO.readTextAsync(sampleFile);
                })
                .done(function (gotscores) {
                    var scores = JSON.parse(gotscores);
                    GamesPlayed = scores;

                    // Append the game data to the scoreboard
                    for (var i = 0; i < GamesPlayed.length; i++) {
                        var x = document.createElement("p");
                        $(x).html(GamesPlayed[i].datePlayed + " " + GamesPlayed[i].timeElapsed + " " + GamesPlayed[i].numberOfMoves)
                            .appendTo("#scoreboard");
                    }
                }, function () {

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
})();
