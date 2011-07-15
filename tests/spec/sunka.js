describe("Sunka", function() {

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
        it('sets up players', function(){
            expect(sunka.players().length).toEqual(2);
            expect(sunka.currentPlayer()).toBe(sunka.players()[0]);
        });
        it('sets up pots', function(){
            expect(sunka.allPots().length).toEqual(14);
            expect(sunka.allPots()[6].nextPot).toBe(sunka.allPots()[7]);
            expect(sunka.allPots()[13].nextPot).toBe(sunka.allPots()[0]);
        });

        it('links players to pots', function(){
            expect(sunka.allPots()[6].nextPlayer).toBe(sunka.players()[0]);
            expect(sunka.allPots()[13].nextPlayer).toBe(sunka.players()[1]);
        });
        
        it('takes a turn', function(){
            expect(sunka.turn(1)).toBeTruthy();
            expect(sunka.allPots()[0].shellCount).toBe(0);
        });

        it('sees player 1 has gained a shell', function(){
            expect(sunka.players()[0].pot.shellCount).toBe(1);
        });

        it('finds more shells in pots 2-7', function(){
            expect(sunka.allPots()[1].shellCount).toBe(8);
            expect(sunka.allPots()[2].shellCount).toBe(8);
            expect(sunka.allPots()[3].shellCount).toBe(8);
            expect(sunka.allPots()[4].shellCount).toBe(8);
            expect(sunka.allPots()[5].shellCount).toBe(8);
            expect(sunka.allPots()[6].shellCount).toBe(8);
        });
        
        it('has not put shells in pots 8-14', function(){
            expect(sunka.allPots()[7].shellCount).toBe(7);
            expect(sunka.allPots()[8].shellCount).toBe(7);
            expect(sunka.allPots()[9].shellCount).toBe(7);
            expect(sunka.allPots()[10].shellCount).toBe(7);
            expect(sunka.allPots()[11].shellCount).toBe(7);
            expect(sunka.allPots()[12].shellCount).toBe(7);
            expect(sunka.allPots()[13].shellCount).toBe(7);
        });

        it('has kept the player as player 1', function(){
            expect(sunka.currentPlayer()).toBe(sunka.players()[0]);
        });

        it('does\'t let player 1 pick up from empty pot 1', function(){
            expect(function(){sunka.turn(1);}).toThrow(sunka.errors.POT_EMPTY_ERROR);
        });

        it('takes a second turn', function(){
            expect(sunka.turn(7)).toBe(true);
            expect(sunka.allPots()[6].shellCount).toBe(0);
        });

        it('finds 2 shells in player 1\'s pot', function(){
            expect(sunka.players()[0].pot.shellCount).toBe(2);
        });

        it('finds no change to pots 1-7', function(){
            expect(sunka.allPots()[1].shellCount).toBe(8);
            expect(sunka.allPots()[2].shellCount).toBe(8);
            expect(sunka.allPots()[3].shellCount).toBe(8);
            expect(sunka.allPots()[4].shellCount).toBe(8);
            expect(sunka.allPots()[5].shellCount).toBe(8);
        });
        
        it('finds 8 shells in pot 8-14', function(){
            expect(sunka.allPots()[7].shellCount).toBe(8);
            expect(sunka.allPots()[8].shellCount).toBe(8);
            expect(sunka.allPots()[9].shellCount).toBe(8);
            expect(sunka.allPots()[10].shellCount).toBe(8);
            expect(sunka.allPots()[11].shellCount).toBe(8);
            expect(sunka.allPots()[12].shellCount).toBe(8);
            expect(sunka.allPots()[13].shellCount).toBe(8);
        });

        it('finds no shells in player 2\'s pot', function(){
            expect(sunka.players()[1].pot.shellCount).toBe(0);
        });
    });
});
