NineTeen.game = {};

NineTeen.game.NewGame = function () {
    var newGame = new NineTeen.GameRound(NineTeen.gameRounds.length, STD_LINE_LENGTH);
    NineTeen.gameRounds[newGame.id] = newGame;
    NineTeen.gameUI.OpenNewGameTab(newGame);
};


NineTeen.game.SelectNumber = function (pGame, pIndex) {
    //Ignore clicks on crossed numbers
    if (pGame.numbers[pIndex].crossed) {
        pGame.selectedIndex = undefined;
        NineTeen.gameUI.DrawGame(pGame);
    } else if (pGame.selectedIndex === undefined) {
        pGame.selectedIndex = pIndex;
        var options = NineTeen.game.FindOptions(pGame, pIndex);
        NineTeen.gameUI.ShowOptions(pGame, options);
    } else {
        var options = NineTeen.game.FindOptions(pGame, pGame.selectedIndex);
        //Check if a fitting numbers was cliked
        for (var i = 0; i < options.length; i++) {
            if (options[i] === pIndex) {
                pGame.numbers[pIndex].crossed = true;
                pGame.numbers[pGame.selectedIndex].crossed = true;
                pGame.selectedIndex = undefined;
                NineTeen.gameUI.DrawGame(pGame);
                return;
            }
        }

        //Unselect the already selected number
        if (pIndex === pGame.selectedIndex) {
            pGame.selectedIndex = undefined;
            NineTeen.gameUI.DrawGame(pGame);
        } else {
            pGame.selectedIndex = pIndex;
            NineTeen.gameUI.DrawGame(pGame);
            var options = NineTeen.game.FindOptions(pGame, pIndex);
            NineTeen.gameUI.ShowOptions(pGame, options);
        }
    }
}


NineTeen.game.Copy = function (pGame) {
    var length = pGame.numbers.length;
    var count = 0;
    for (var i = 0; i < length; i++) {
        if (!pGame.numbers[i].crossed) {
            pGame.numbers[length + count] = new NineTeen.Number(pGame.numbers[i].number);
            count++;
        }
    }
    pGame.selectedIndex = undefined;
    NineTeen.gameUI.DrawGame(pGame);
};

NineTeen.game.FindOptions = function (pGame, pIndex) {
    var number = pGame.numbers[pIndex];

    var options = [];

    //Checks wether an option is fitting and adds it to options
    var CheckOption = function (pPossibleIndex) {
        if (pPossibleIndex !== undefined) {
            if (pGame.numbers[pPossibleIndex].number === pGame.numbers[pIndex].number || pGame.numbers[pPossibleIndex].number + pGame.numbers[pIndex].number === 10) {
                options[options.length] = pPossibleIndex;
            }
        }
    }

    var rightIndex = NineTeen.game.Get(pGame, pIndex, "right", true);
    var leftIndex = NineTeen.game.Get(pGame, pIndex, "left", true);
    var downIndex = NineTeen.game.Get(pGame, pIndex, "down", true);
    var upIndex = NineTeen.game.Get(pGame, pIndex, "up", true);

    CheckOption(rightIndex);
    CheckOption(leftIndex);
    CheckOption(downIndex);
    CheckOption(upIndex);


    return options;
};

//Get the next uncrossed number recursivly
NineTeen.game.Get = function (pGame, pIndex, pDirection, pFirst) {
    if (pDirection === "right") {
        pIndex++;
        //Out of Bounds
        if (pIndex === pGame.numbers.length) {
            return undefined;
        }
        if (pGame.numbers[pIndex].crossed === false) {
            return pIndex;
        } else {
            return NineTeen.game.Get(pGame, pIndex, pDirection, false);
        }
    } else if (pDirection === "left") {
        pIndex--;
        //Out of Bounds
        if (pIndex === -1) {
            return undefined;
        }
        if (pGame.numbers[pIndex].crossed === false) {
            return pIndex;
        } else {
            return NineTeen.game.Get(pGame, pIndex, pDirection, false);
        }
    } else if (pDirection === "up") {
        pIndex -= pGame.lineLength;
        //Out of Bounds
        if (pIndex < 0) {
            return undefined;
        }
        if (pGame.numbers[pIndex].crossed === false) {
            return pIndex;
        } else {
            return NineTeen.game.Get(pGame, pIndex, pDirection, false);
        }
    } else if (pDirection === "down") {
        pIndex += pGame.lineLength;
        //Out of Bounds
        if (pIndex >= pGame.numbers.length) {
            return undefined;
        }
        if (pGame.numbers[pIndex].crossed === false) {
            return pIndex;
        } else {
            return NineTeen.game.Get(pGame, pIndex, pDirection, false);
        }
    }
};