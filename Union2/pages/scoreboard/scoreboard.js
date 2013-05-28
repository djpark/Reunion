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
            $("#resetScoresButton").click(function () {

                // play sound
                $('#audioClick')[0].play();

                var gameManager = new GameManager();
                gameManager.ClearGames();

                // Clear the current score board
                $("#easyScoreboard").empty();
                $("#mediumScoreboard").empty();
                $("#hardScoreboard").empty();

                // Add in empty headers and data
                var easyHeader = document.createElement("h3");
                $(easyHeader).html("EASY").appendTo("#easyScoreboard");

                var mediumHeader = document.createElement("h3");
                $(mediumHeader).html("MEDIUM").appendTo("#mediumScoreboard");

                var hardHeader = document.createElement("h3");
                $(hardHeader).html("HARD").appendTo("#hardScoreboard");

                // Append empty game data to the scoreboard
                for (var i = 1; i <= 10; i++) {
                    var x = document.createElement("div");
                    x.className = "score";
                    $(x).html(i + ". ")
                        .appendTo("#easyScoreboard");

                    var y = document.createElement("div");
                    y.className = "score";
                    $(y).html(i + ". ")
                        .appendTo("#mediumScoreboard");

                    var z = document.createElement("div");
                    z.className = "score";
                    $(z).html(i + ". ")
                        .appendTo("#hardScoreboard");
                }
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

                var easyGameScores = new Array();
                var mediumGameScores = new Array();
                var hardGameScores = new Array();

                // Split out game data to modes so we can append to appropriate divs
                for (var i = 0; i < scores.length; i++) {
                    if (scores[i].gameMode == "easy") {
                        easyGameScores.push(scores[i]);
                    } else if (scores[i].gameMode = "medium") {
                        mediumGameScores.unshift(scores[i]);
                    } else if (scores[i].push = "hard") {
                        hardGameScores.push(scores[i]);
                    }
                }

                // Append the easy game data to the scoreboard
                for (var i = 1; i <= 10; i++) {
                    // If there's game data, then append it
                    if (i - 1 < easyGameScores.length) {
                        var x = document.createElement("div");
                        x.className = "score";
                        $(x).html(i + ". " + "Cleared - " + easyGameScores[i - 1].timeElapsed + " sec (" + easyGameScores[i - 1].numberOfMoves + " moves)")
                            .appendTo("#easyScoreboard");
                    }
                    // Otherwise append an empty cell
                    else {
                        var x = document.createElement("div");
                        x.className = "score";
                        $(x).html(i + ". ")
                            .appendTo("#easyScoreboard");
                    }
                }

                // Append the medium game data to the scoreboard
                for (var i = 1; i <= 10; i++) {
                    // If there's game data, then append it
                    if (i - 1 < mediumGameScores.length) {
                        var x = document.createElement("div");
                        x.className = "score";
                        $(x).html(i + ". " + "Cleared - " + mediumGameScores[i - 1].timeElapsed + " sec (" + mediumGameScores[i - 1].numberOfMoves + " moves)")
                            .appendTo("#mediumScoreboard");
                    }
                        // Otherwise append an empty cell
                    else {
                        var x = document.createElement("div");
                        x.className = "score";
                        $(x).html(i + ". ")
                            .appendTo("#mediumScoreboard");
                    }
                }

                // Append the hard game data to the scoreboard
                for (var i = 1; i <= 10; i++) {
                    // If there's game data, then append it
                    if (i - 1 < hardGameScores.length) {
                        var x = document.createElement("div");
                        x.className = "score";
                        $(x).html(i + ". " + "Cleared - " + hardGameScores[i - 1].timeElapsed + " sec (" + hardGameScores[i - 1].numberOfMoves + " moves)")
                            .appendTo("#hardScoreboard");
                    }
                        // Otherwise append an empty cell
                    else {
                        var x = document.createElement("div");
                        x.className = "score";
                        $(x).html(i + ". ")
                            .appendTo("#hardScoreboard");
                    }
                }
            }, function () {

            });
    }
})();
