// Interaction points:
// 1. When a user starts a game and clicks a tile, a timer needs to start running on the level
// 2. When GameWin() is true, a function in GameManager needs to be called w/ # of turns and time params to add to the array
// 3. When the scoreboard page is loaded up, the GameManager should be called to load in all scores

/**
 * GameManager
 * A class which manages the history of games played.
 */
var GameManager = function () {
    // An array storing all the games played
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
    this.GamesPlayed.push(new Game(timeElapsed, numberofMoves));

    var gameDataSerialized = JSON.stringify(this.GamesPlayed);

    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;

    localFolder.createFileAsync("gamedata.txt", Windows.Storage.CreationCollisionOption.openIfExists)
    .then(function (sampleFile) {
        return Windows.Storage.FileIO.writeTextAsync(sampleFile, gameDataSerialized);
    });
};


