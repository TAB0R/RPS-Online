class GameController {
    constructor() {
        this.currentId = 0;
        this.games = {};
    }

    addNewGame(game) {
        this.games[this.currentId] = game;
        var msg = JSON.stringify({
            'type': 'startGame',
            'firstPlayer': game.players[0].login,
            'secondPlayer': game.players[1].login,
            'gameId': this.currentId
        });
        this.currentId++;
        game.players[0].ws.send(msg);
        game.players[1].ws.send(msg);
        console.log(`Game with players: ${game.players[0].login} and ${game.players[1].login} is started`);
    }

    makeTurn(gameId, player, choice) {
        this.games[gameId].makeTurn(player, choice);
    }

    checkRoundWinner(gameId) {
        return this.games[gameId].checkRoundWinner();
    }
}

exports.GameController = () => {
    return new GameController();
}
