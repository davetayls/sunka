/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define,require */
require(["jquery", "sunka"], function($, sunka) {
    $(function() {

        var $container          = $('#sunka'),
            $pots               = $('<ul />').appendTo($container),
            allPots;

        sunka.startGame();
        allPots = sunka.allPots();

        var ln = allPots.length,
            i,
            pot,
            cssClass;
        for (i = 0; i < ln; i++) {
            pot = allPots[i];
            cssClass = pot.player ? 'pot playerPot' : 'pot';
            $pots.append('<li class="' + cssClass + '">' + pot.shellCount + '</li>');
        }


    });
});
