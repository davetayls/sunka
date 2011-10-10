/**
    sunka game
-------------------------------------------------------*/
/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define,require */
define([ 'Pot', 'Player', 'Queue' ], function(Pot, Player, Queue){
    'use strict';

    var exports             = {},
        currentPlayerIndex  = -1,
        players             = [],
        pots                = [],
        shellsInHand        = 0,
        turns               = 0,

        POT_NOT_EXIST       = 'This pot isn\'t there',
        POT_IS_PLAYER       = 'You can\'t pick up from a player pot',
        POT_EMPTY_ERROR     = 'You cannot pick up from an empty pot';
        
    // => logging
    var log = function(log){
        if (window.console){ window.console.log(log); }
    };
    var logTurnOutcome = function() {
        if (window.console) {
            window.console.log('turn: ' + turns);
            window.console.log('    ' + pots[8].shellCount + '   ' + pots[9].shellCount + '   ' + pots[10].shellCount + '   ' + pots[11].shellCount + '   ' + pots[12].shellCount + '   ' + pots[13].shellCount + '   ' + pots[14].shellCount + '   ');
            window.console.log(pots[7].shellCount + '                               ' + pots[15].shellCount);
            window.console.log('    ' + pots[6].shellCount + '   ' + pots[5].shellCount + '   ' + pots[4].shellCount + '   ' + pots[3].shellCount + '   ' + pots[2].shellCount + '   ' + pots[1].shellCount + '   ' + pots[0].shellCount + '   ');
        }
    };

    // => Queues
    var uiQueue = exports.uiQueue = new Queue(),
        QUEUE_KEYS = exports.QUEUE_KEYS = {
            startGame: 'startGame',
            turnBegin: 'turnBegin'
        };

    // => misc
    var addShellsToHand = function(shells) {
        shellsInHand += shells;
        uiQueue.add({ key: QUEUE_KEYS.handChange });
    };
    var removeShellsFromHand = function(shells) {
        shellsInHand -= shells;
        uiQueue.add({ key: QUEUE_KEYS.handChange });
    };
    var countShellsInHand = exports.countShellsInHand = function() {
        return shellsInHand;
    };
    var getTotalShells = function() {
        return (pots.length - players.length) * 7;
    };
    var shellsOnTheBoard = function(allPots){
        var ln = allPots.length,
            i,
            total = 0;
        for (i = 0; i < ln; i++) {
            total += allPots[i].shellCount;
        }
        return total;
    };
    var hasWon = function(allPots) {
        var playerDiff = players[0].pot.shellCount > players[1].shellCount 
                         ? players[0].pot.shellCount - players[1].shellCount 
                         : players[1].pot.shellCount > players[0].shellCount,
            shellsLeft = shellsOnTheBoard(allPots);

        if (playerDiff > shellsLeft) {
            return false;
        }
        return players[0].pot.shellCount > players[1].pot.shellCount ? players[0] : players[1];
    };
    exports.hasWon = function(){
        return hasWon(this.allPots());
    };


    // => player
    var currentPlayer = exports.currentPlayer = function(){
        return players[currentPlayerIndex];
    };
    exports.players = function() {
        return players;
    };
    var changePlayer = function() {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        uiQueue.add({ key: QUEUE_KEYS.turnBegin });
        log('Player changed to: ' + (currentPlayerIndex + 1));
    };

    // => pots
    var potCount = exports.potCount = function(player) {
        return players[player-1].pot.shellCount;
    };
    var getNextPot = function(pot, player) {
        if (pot.nextPot.player){ 
            if (pot.nextPot.player === player) {
                return pot.nextPot;
            } else {
                return pot.nextPot.nextPot;
            }
        }else{
            return pot.nextPot;
        }
    };
    exports.allPots = function() {
        return pots;
    };

    // => set up
    var resetPlayers = function(){
        players = [
            new Player(),
            new Player()
        ];
        changePlayer();
    };
    var resetPots = function() {
        pots = [];
        pots.unshift(new Pot(7, null, players[1])); // 16
        pots.unshift(new Pot(7, pots[0])); // 15
        pots.unshift(new Pot(7, pots[0])); // 14
        pots.unshift(new Pot(7, pots[0])); // 13
        pots.unshift(new Pot(7, pots[0])); // 12
        pots.unshift(new Pot(7, pots[0])); // 11
        pots.unshift(new Pot(7, pots[0])); // 10
        pots.unshift(new Pot(9, pots[0])); // 09
        pots.unshift(new Pot(8, pots[0], players[0])); // 08
        pots.unshift(new Pot(7, pots[0])); // 07
        pots.unshift(new Pot(6, pots[0])); // 06
        pots.unshift(new Pot(5, pots[0])); // 05
        pots.unshift(new Pot(4, pots[0])); // 04
        pots.unshift(new Pot(3, pots[0])); // 03
        pots.unshift(new Pot(2, pots[0])); // 02
        pots.unshift(new Pot(1, pots[0])); // 01

        pots[15].nextPot = pots[0];
    };

    // => game actions
    exports.startGame = function(){
        uiQueue.add({ key: QUEUE_KEYS.startGame });
        resetPlayers();
        resetPots();
        return true;
    };
    var run = function(pot) {
        var nextPot = pot;

        if (pot) {
            if (pot.shellCount === 0) {
                throw POT_EMPTY_ERROR;
            }
            addShellsToHand(pot.empty());
            uiQueue.add({ key: QUEUE_KEYS.potChange });
            do {
                nextPot = getNextPot(nextPot, currentPlayer());
                nextPot.drop();
                uiQueue.add({ key: QUEUE_KEYS.potChange });
                removeShellsFromHand(1);
            } while (shellsInHand);
        } else {
            throw POT_NOT_EXIST;
        }
        return nextPot;
    };
    var turn = exports.turn = function(potNumber) {
        var pot = pots[potNumber - 1];

        if (pot.player){
            throw POT_IS_PLAYER;
        } else if (pot) {
            do {
                pot = run(pot);
            } while (pot.shellCount > 1 && !pot.player);
            if (!pot.player) {
                changePlayer();
            }
        } else {
            throw POT_NOT_EXIST;
        }
        turns++;
        logTurnOutcome();
        return true;
    };

    // => errors
    exports.errors = {
        POT_EMPTY_ERROR: POT_EMPTY_ERROR,
        POT_IS_PLAYER: POT_IS_PLAYER
    };

    return exports;
});
