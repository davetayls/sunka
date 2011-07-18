/**
    Pot
-------------------------------------------------------*/
define(function(){

    var POT_EMPTY_ERROR     = 'You cannot pick up from an empty pot';

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

    return Pot;
});
