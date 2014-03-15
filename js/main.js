var NineTeen = {};

var STD_LINE_LENGTH = 9;
var NUMBERS = "123456789111213141516171819";

NineTeen.gameRounds = [];
NineTeen.currentGame = 0;

NineTeen.Number = function (pNumber) {
    this.number = pNumber;
    this.crossed = false;
}

NineTeen.GameRound = function (pId, pLineLength) {
    this.id = pId;
    this.lineLength = pLineLength;
    this.numbers = [];
    this.index = undefined;

    for (var i = 0; i < NUMBERS.length; i++) {
        this.numbers[i] = new NineTeen.Number(parseInt(NUMBERS[i]));
    }

    this.GetNumber = function (pX, pY) {
        return this.numbers[pY * this.lineLength + pX];
    }

    this.GetDimension = function () {
        var dim = {};
        dim.x = this.lineLength;
        dim.y = Math.floor(this.numbers.length / this.lineLength);
        return dim;
    }
}