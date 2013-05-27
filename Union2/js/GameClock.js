/**
 * GameClock
 * A class which creates and updates a game clock.
 */
var GameClock = function (container, minutes, onComplete) {
    this._container = container;
    this._intervalId = null;
    this._secondsRemaining = minutes * 60;
    this._onComplete = onComplete;
};

/**
 * Begin counting
 */
GameClock.prototype.StartCounting = function () {
    if (!this._intervalId) {
        var _self = this;
        this._intervalId = setInterval(function () { _self.UpdateClock(); }, 1000);
    }
};

/**
 * Updates the contents of the container div to show the time.
 */ 
GameClock.prototype.UpdateClock = function () {
    var minutes = Math.floor(this._secondsRemaining / 60);
    var seconds = this._secondsRemaining % 60;

    var secondsString = seconds < 10 ? "0" + seconds : seconds;

    $(this._container).text(minutes + ":" + secondsString);

    if (this._secondsRemaining == 0)
    {
        clearInterval(this._intervalId);
        this._onComplete();
    }

    this._secondsRemaining--;
};