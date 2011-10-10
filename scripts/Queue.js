/**
    Queue
-------------------------------------------------------*/
/*jslint browser: true, vars: true, white: true, forin: true, indent: 4 */
/*global define,require */
define(function(){
    'use strict';

    var Queue = function(){
    };
    Queue.prototype = {
        items: [],
        add: function(itm) {
            this.items.push(itm);
        },
        pull: function() {
            if (this.items.length) {
                return this.items.shift();
            }
            return;
        }
    };

    return Queue;
});
