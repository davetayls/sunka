/**
    sunka game
-------------------------------------------------------*/
define(function(){
    var currentPlayer       = 1,
        players             = [],
        pots                = [];

    var Pot = function() {
        
    };
    Pot.prototype = {
        shellCount: 7
    };


    var Player = function(){
    };
    Player.prototype = {
        pot: new Pot()
    };

    var exports = {
        allPots: function() {
            return pots;
        },
        // player
        currentPlayer: function(){
            return currentPlayer;
        },
        players: function() {
            return players;
        },
        potCount: function(player) {
            return players[player-1].pot.shellCount;
        },
        startGame: function(){
            players = [
                new Player(),
                new Player()
            ];
            pots = [];
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            pots.unshift(new Pot(pots[1]));
            return true;
        },
        turn: function(potNumber) {
            var pot = pots[potNumber - 1];
            // pot.empty();
            return true;
        }
    };

    return exports;
});
