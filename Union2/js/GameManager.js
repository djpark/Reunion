// Interaction points:
// 1. When a user starts a game and clicks a tile, a timer needs to start running on the level
// 2. When GameWin() is true, a function in GameManager needs to be called w/ # of turns and time params to add to the array
// 3. When the scoreboard page is loaded up, the GameManager should be called to load in all scores

/**
 * GameManager
 * A class which manages the history of games played.
 */
var GameManager = function () {
    this.GamesPlayed = new Array();
};

/**
 * Game
 * A class represents a game.
 */
var Game = function (numberOfMoves, timeElapsed) {
    // Stores the date of when the game was played
    this.datePlayed = new Date();

    // Stores the time
    this.timeElapsed = timeElapsed;

    // Stores the number of moves
    this.numberOfMoves = numberOfMoves;
}

/**
 * ClearGames
 * Remove all games from the localfolder
 */
GameManager.prototype.ClearGames = function () {
    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;

    // Replace the existing file with empty content 
    localFolder.createFileAsync("gamedata.txt", Windows.Storage.CreationCollisionOption.replaceExisting).
    then(function (sampleFile) {
        return Windows.Storage.FileIO.appendTextAsync(sampleFile, "[]");
    });
}

/**
 * AddGameEntry
 * Add game detail to the GamesPlayed array
 */
GameManager.prototype.AddGameEntry = function (numberOfMoves, timeElapsed) {
    var game = new Game(numberOfMoves, timeElapsed);
    this.GamesPlayed.push(game);

    var gameDataSerialized = JSON.stringify(this.GamesPlayed);

    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;

    // Try to read the existing gamedata.txt file.  If there's an exception, start over
    // First get the existing games from the localfolder
    localFolder.getFileAsync("gamedata.txt")
        .then(function (sampleFile) {
            return Windows.Storage.FileIO.readTextAsync(sampleFile);
        })
        .done(function (gotscores) {
            // JSON.parse bombs out if gotscores is ever empty so convert to empty array instead
            if (gotscores == "")
                gotscores = "[]";

            var scores = new Array();
            var results = JSON.parse(gotscores);

            // Then iterate through the games and push into our temp array
            for (var i = 0; i < results.length; i++) {
                scores.push(results[i]);
            }

            // Push the latest game
            scores.push(game);

            // Then serialize the results
            var gameDataSerialized = JSON.stringify(scores);

            // and write the new object back to the file
            localFolder.createFileAsync("gamedata.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
            .then(function (sampleFile) {
                WinJS.Navigation.navigate("/pages/scoreboard/scoreboard.html");
                return Windows.Storage.FileIO.appendTextAsync(sampleFile, gameDataSerialized);
            });
        },
        // Exception handler that creates a new file if one does not already exists
        // TODO: Figure out how to get more granular with exception catching so we're not doing a global catch
        function () {
            var scores = new Array();

            // Push the latest game
            scores.push(game);

            // Then serialize the results
            var gameDataSerialized = JSON.stringify(scores);

            // and write the new object back to the file
            localFolder.createFileAsync("gamedata.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
            .then(function (sampleFile) {
                WinJS.Navigation.navigate("/pages/scoreboard/scoreboard.html");

                return Windows.Storage.FileIO.appendTextAsync(sampleFile, gameDataSerialized);
            });
        });
};
