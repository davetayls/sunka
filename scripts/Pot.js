/**
    Pot
-------------------------------------------------------*/
/*jslint vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define */
define(function(){
    'use strict';

    var Pot = function(nextPot, player) {
        this.nextPot = nextPot;
        this.player = player;
        this.shellCount = this.player ? 0 : 7;
        if (this.player) {
            this.player.pot = this;
        }
    };
    Pot.prototype = {
        drop: function(player) {
           this.shellCount +=1; 
           return this.shellCount;
        },
        empty: function() {
            var shellCount = this.shellCount;
            this.shellCount = 0;
            return shellCount;
        }
    };

    return Pot;
});
