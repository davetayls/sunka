/**
    sunka game
-------------------------------------------------------*/
define(function(){
    var currentPlayer       = 1;

    var exports = {
        currentPlayer: function(){
            return currentPlayer;
        },
        startGame: function(){
            return true;
        },
        turn: function(pot) {
            return true;
        }
    };

    return exports;
});
