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
var Game = function (timeElapsed, numberOfMoves) {
    // Stores the date of when the game was played
    this.datePlayed = new Date();

    // Stores the time
    this.timeElapsed = timeElapsed;

    // Stores the number of moves
    this.numberOfMoves = numberOfMoves;
}

/**
 * AddGameEntry
 * Add game detail to the GamesPlayed array
 */
GameManager.prototype.AddGameEntry = function (timeElapsed, numberOfMoves) {
    var game = new Game(timeElapsed, numberOfMoves);
    this.GamesPlayed.push(game);

    var gameDataSerialized = JSON.stringify(this.GamesPlayed);

    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;

    //localFolder.createFileAsync("gamedata.txt", Windows.Storage.CreationCollisionOption.replaceExisting).
    //then(function (sampleFile) {
    //    return Windows.Storage.FileIO.appendTextAsync(sampleFile, gameDataSerialized);
    //});

    // First get the existing items and push the new game
    localFolder.getFileAsync("gamedata.txt")
        .then(function (sampleFile) {
            return Windows.Storage.FileIO.readTextAsync(sampleFile);
        })
        .done(function (gotscores) {
            var scores = new Array();
            var results = JSON.parse(gotscores);
            
            for (var i = 0; i < results.length; i++) {
                scores.push(results[i]);
            }

            scores.push(game);
            
            var gameDataSerialized = JSON.stringify(scores);

            // Then write the new object back to the file
            localFolder.createFileAsync("gamedata.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
            .then(function (sampleFile) {
                return Windows.Storage.FileIO.appendTextAsync(sampleFile, gameDataSerialized);
            });
        }, function () {

        });
};
