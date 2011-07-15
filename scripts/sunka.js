/**
    sunka game
-------------------------------------------------------*/
define(function(){
    var exports             = {},
        currentPlayerIndex  = 0,
        players             = [],
        pots                = [],
        
        POT_EMPTY_ERROR     = 'You cannot pick up from an empty pot';

    var Pot = function(nextPot, nextPlayer) {
        this.nextPot = nextPot;
        this.nextPlayer = nextPlayer;
    };
    Pot.prototype = {
        isPlayerPot: false,
        shellCount: 7,
        drop: function(shellCount) {
            if (shellCount > 0) {
                this.shellCount +=1;
                shellCount--;

                if (shellCount === 0 && this.shellCount === 1 && !this.isPlayerPot) {
                    changePlayer();
                } else if (shellCount === 0 && this.shellCount > 1 && !this.isPlayerPot) {
                    this.empty();
                } else if (shellCount > 0) {
                    if (this.nextPlayer && this.nextPlayer === currentPlayer()) {
                        shellCount = this.nextPlayer.drop(shellCount);
                    }
                    if (this.nextPot){
                        this.nextPot.drop(shellCount);
                    }
                }
            }
            return shellCount;
        },
        empty: function() {
            var shellCount = this.shellCount;
            this.shellCount = 0;
            if (this.nextPlayer && this.nextPlayer === currentPlayer()){
                shellCount = this.nextPlayer.drop(shellCount);
            }
            if (this.nextPot) {
                this.nextPot.drop(shellCount);
            }
        }
    };


    var Player = function(){
        this.pot = new Pot();
        this.pot.shellCount = 0;
        this.pot.isPlayerPot = true;
    };
    Player.prototype = {
        drop: function(shellCount) {
            return this.pot.drop(shellCount);
        }
    };

    exports = {
        // access to variables
        errors: {
            POT_EMPTY_ERROR: POT_EMPTY_ERROR
        },
        allPots: function() {
            return pots;
        },

        // game actions
        startGame: function(){
            players = [
                new Player(),
                new Player()
            ];
            pots = [];
            pots.unshift(new Pot(null, players[1])); // 14
            pots.unshift(new Pot(pots[0])); // 13
            pots.unshift(new Pot(pots[0])); // 12
            pots.unshift(new Pot(pots[0])); // 11
            pots.unshift(new Pot(pots[0])); // 10
            pots.unshift(new Pot(pots[0])); // 09
            pots.unshift(new Pot(pots[0])); // 08
            pots.unshift(new Pot(pots[0], players[0])); // 07
            pots.unshift(new Pot(pots[0])); // 06
            pots.unshift(new Pot(pots[0])); // 05
            pots.unshift(new Pot(pots[0])); // 04
            pots.unshift(new Pot(pots[0])); // 03
            pots.unshift(new Pot(pots[0])); // 02
            pots.unshift(new Pot(pots[0])); // 01

            pots[13].nextPot = pots[0];

            return true;
        },
        turn: function(potNumber) {
            var pot = pots[potNumber - 1],
                shells;

            if (pot.shellCount === 0) {
                throw POT_EMPTY_ERROR;
            }
            shells = pot.empty();
            return true;
        }
    };

    // player
    var currentPlayer = exports.currentPlayer = function(){
        return players[currentPlayerIndex];
    };
    exports.players = function() {
        return players;
    };
    var potCount = exports.potCount = function(player) {
        return players[player-1].pot.shellCount;
    };
    var changePlayer = function() {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    return exports;
});
