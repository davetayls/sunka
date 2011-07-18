/**
    Player
-------------------------------------------------------*/
define([ 'Pot' ], function(Pot){

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

    return Player;
});
