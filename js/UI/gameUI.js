NineTeen.gameUI = {};

$(document).ready(function () {
    $("#newGameButton").bind("click", NineTeen.game.NewGame);
});


NineTeen.gameUI.DrawGame = function (pGame) {
    var tableHtml = "";
    for (var y = 0; y < pGame.GetDimension().y; y++) {
        var rowHtml = '<tr>';
        for (var x = 0; x < pGame.GetDimension().x; x++) {

            var extraClass = "";
            if (pGame.GetNumber(x, y).crossed || pGame.selectedIndex === x + y * pGame.lineLength) {
                extraClass = "active";
            }

            rowHtml += '<td><button type="button" class="btn btn-default ' + extraClass + '" data-toggle="button" id="button' + pGame.id + "index" + (x + y * pGame.lineLength) + '">';

            if (pGame.GetNumber(x, y).crossed) {
                rowHtml += '<strike>' + pGame.GetNumber(x, y).number + '</strike>';
            } else {
                rowHtml += pGame.GetNumber(x, y).number;
            }

            rowHtml += '</button></td>';
        }

        rowHtml += '</tr>';
        tableHtml += rowHtml;
    }

    $("#gameTable" + pGame.id).html(tableHtml);
    $("#gameTable" + pGame.id + " button").bind("click", function () {
        NineTeen.game.SelectNumber(pGame, parseInt(this.id.split("index")[1]));
    })
};

NineTeen.gameUI.OpenNewGameTab = function (pGame) {
    $("#gameTabs").append('<li> <a href="#gameTab' + pGame.id + '" data-toggle="tab">Game ' + (pGame.id + 1) + '</a> </li>');
    $("#gameTabsContent").append('<div class="tab-pane" id="gameTab' + pGame.id + '"> <table class="table" id="gameTable' + pGame.id + '"><tbody></tbody></table></div>')
    NineTeen.gameUI.DrawGame(pGame);

    $('#gameTabs a:last').click(function (e) {
        e.preventDefault()
        //Unbind the old binding
        $("#copyButton").unbind();
        $("#copyButton").bind("click", function () {
            NineTeen.game.Copy(pGame)
        });
        $(this).tab('show')
    })
};

NineTeen.gameUI.ShowOptions = function (pGame, pOptions) {
    for (var i = 0; i < pOptions.length; i++) {
        $("#button" + pGame.id + "index" + pOptions[i]).removeClass("btn-default");
        $("#button" + pGame.id + "index" + pOptions[i]).addClass("btn-warning");
    }
};