/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define,require,describe,afterEach,beforeEach,expect,it,waitsFor */
describe("Pot", function() {
    'use strict';

    var Pot;

    beforeEach(function(){
        waitsFor(function(){
            return typeof Pot === 'function';
        }, 'never got a Pot module', 1000);

        require( { baseUrl: window.baseRequireUrl }, ["Pot"],
            function(potModule) {
                Pot = potModule;
            }
        );
    });
    
    it("should have the Pot module", function() {
        expect(Pot).toBeDefined();
    });

    describe('Basic Functionality', function(){

    });
});
