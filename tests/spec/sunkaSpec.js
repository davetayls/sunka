/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define,require,describe,afterEach,beforeEach,expect,it,waitsFor */
describe("Sunka", function() {
    'use strict';

    var sunka;

    beforeEach(function(){
        waitsFor(function(){
            return typeof sunka === 'object';
        }, 'never got a sunka module', 1000);

        require( { baseUrl: window.baseRequireUrl }, ["sunka"],
            function(sunkaModule) {
                sunka = sunkaModule;
            }
        );
    });
    
    it("should have the sunka module", function() {
        expect(sunka).toBeDefined();
    });

    describe('Game 1', function(){

        it('can start a new game', function(){
            expect(sunka.startGame()).toBeTruthy();
        });
        it('can see new game in the queue', function(){
            expect(sunka.uiQueue.pull().key).toBe(sunka.QUEUE_KEYS.startGame);
        });
        it('sets up players', function(){
            expect(sunka.players().length).toEqual(2);
            expect(sunka.currentPlayer()).toBe(sunka.players()[0]);
        });
        it('can see a new turn has begun in the queue', function(){
            expect(sunka.uiQueue.pull().key).toBe(sunka.QUEUE_KEYS.turnBegin);
        });
        it('sets up pots', function(){
            expect(sunka.allPots().length).toEqual(16);
            expect(sunka.allPots()[6].nextPot).toBe(sunka.allPots()[7]);
            expect(sunka.allPots()[sunka.allPots().length-1].nextPot).toBe(sunka.allPots()[0]);
        });

        it('links players to pots', function(){
            expect(sunka.allPots()[7].player).toBe(sunka.players()[0]);
            expect(sunka.allPots()[15].player).toBe(sunka.players()[1]);
        });
        
        it('takes a turn', function(){
            expect(sunka.turn(1)).toBeTruthy();
            expect(sunka.allPots()[0].shellCount)
                .toBe(0);
        });

        it('sees pot 2 has gained a shell', function(){
            expect(sunka.allPots()[1].shellCount)
                .toBe(8);
        });

        it('sees player 1 has gained a shell', function(){
            expect(sunka.players()[0].pot.shellCount)
                .toBe(1);
        });

        it('finds more shells in pots 2-7', function(){
            expect(sunka.allPots()[1].shellCount).toBe(8);
            expect(sunka.allPots()[2].shellCount).toBe(8);
            expect(sunka.allPots()[3].shellCount).toBe(8);
            expect(sunka.allPots()[4].shellCount).toBe(8);
            expect(sunka.allPots()[5].shellCount).toBe(8);
            expect(sunka.allPots()[6].shellCount).toBe(8);
        });
        
        it('has not put shells in pots 9-15', function(){
            expect(sunka.allPots()[8].shellCount).toBe(7);
            expect(sunka.allPots()[9].shellCount).toBe(7);
            expect(sunka.allPots()[10].shellCount).toBe(7);
            expect(sunka.allPots()[11].shellCount).toBe(7);
            expect(sunka.allPots()[12].shellCount).toBe(7);
            expect(sunka.allPots()[13].shellCount).toBe(7);
            expect(sunka.allPots()[14].shellCount).toBe(7);
        });

        it('has kept the player as player 1', function(){
            expect(sunka.currentPlayer()).toBe(sunka.players()[0]);
        });

        it('does\'t let player 1 pick up from empty pot 1', function(){
            expect(function(){sunka.turn(1);}).toThrow(sunka.errors.POT_EMPTY_ERROR);
        });

        it('does\'t let player 1 pick up from a player pot', function(){
            expect(function(){sunka.turn(8);})
            .toThrow(sunka.errors.POT_IS_PLAYER);
        });

        it('takes a second turn', function(){
            expect(sunka.turn(7)).toBe(true);
            expect(sunka.allPots()[6].shellCount).toBe(1);
        });
        /*  BOARD AFTER TURN

                8   8   8   8   8   8   0
            3                               0
                1   9   9   9   9   9   1

         */

        it('finds 3 shells in player 1\'s pot', function(){
            expect(sunka.players()[0].pot.shellCount).toBe(3);
        });

        it('finds new shells in pots 1-7', function(){
            expect(sunka.allPots()[0].shellCount).toBe(1);
            expect(sunka.allPots()[1].shellCount).toBe(9);
            expect(sunka.allPots()[2].shellCount).toBe(9);
            expect(sunka.allPots()[3].shellCount).toBe(9);
            expect(sunka.allPots()[4].shellCount).toBe(9);
            expect(sunka.allPots()[5].shellCount).toBe(9);
            expect(sunka.allPots()[6].shellCount).toBe(1);
        });
        
        it('finds correct shells in pot 8-14', function(){
            expect(sunka.allPots()[8].shellCount).toBe(8);
            expect(sunka.allPots()[9].shellCount).toBe(8);
            expect(sunka.allPots()[10].shellCount).toBe(8);
            expect(sunka.allPots()[11].shellCount).toBe(8);
            expect(sunka.allPots()[12].shellCount).toBe(8);
            expect(sunka.allPots()[13].shellCount).toBe(8);
            expect(sunka.allPots()[14].shellCount).toBe(0);
        });

        it('finds no shells in player 2\'s pot', function(){
            expect(sunka.players()[1].pot.shellCount).toBe(0);
        });

        it('takes a third turn', function(){
            expect(sunka.turn(6)).toBe(true);
        });
        /*  BOARD AFTER TURN

                9   9   9   9   9   9   1
            4                               0
                2   0   9   9   9   9   1

         */

        it('finds 4 shells in player 1\'s pot', function(){
            expect(sunka.players()[0].pot.shellCount).toBe(4);
        });

        it('ended the turn on an empty pot', function(){
            expect(sunka.allPots()[14].shellCount).toBe(1);
        });

        it('has a new active player', function(){
            expect(sunka.currentPlayer()).toBe(sunka.players()[1]);
        });

        it('sees player 2 take it\'s first turn', function(){
            expect(sunka.turn(13)).toBe(true);
        });
        /*  BOARD AFTER TURN

                9   9   9   9   0   10  2
            4                               1
                2   1   10  10  10  10  2

         */

        it('finds 1 shell in player 2\'s pot', function(){
            expect(sunka.players()[1].pot.shellCount).toBe(1);
        });

        it('finds the correct view of the board', function(){
            expect(sunka.allPots()[0].shellCount).toBe(2);
            expect(sunka.allPots()[1].shellCount).toBe(10);
            expect(sunka.allPots()[2].shellCount).toBe(10);
            expect(sunka.allPots()[3].shellCount).toBe(10);
            expect(sunka.allPots()[4].shellCount).toBe(10);
            expect(sunka.allPots()[5].shellCount).toBe(1);
            expect(sunka.allPots()[6].shellCount).toBe(2);

            expect(sunka.allPots()[8].shellCount).toBe(9);
            expect(sunka.allPots()[9].shellCount).toBe(9);
            expect(sunka.allPots()[10].shellCount).toBe(9);
            expect(sunka.allPots()[11].shellCount).toBe(9);
            expect(sunka.allPots()[12].shellCount).toBe(0);
            expect(sunka.allPots()[13].shellCount).toBe(10);
            expect(sunka.allPots()[14].shellCount).toBe(2);
        });

        it('has a new active player 1', function(){
            expect(sunka.currentPlayer()).toBe(sunka.players()[0]);
        });

        it('sees player 1 wins', function(){
            var i, 
                potsLength = sunka.allPots().length;
            for (i = 0; i < potsLength; i++) {
                sunka.allPots()[i].shellCount = 0;
            }
            sunka.allPots()[6].shellCount = 1;
            expect(sunka.turn(7)).toBe(true);
            expect(sunka.hasWon()).toBe(sunka.players()[0]);
        });
        /*  BOARD AFTER TURN

                9   9   9   9   0   10  2
            4                               1
                2   1   10  10  10  10  2

         */
    });
});
