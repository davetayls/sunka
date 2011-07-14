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
        it('and have players set up', function(){
            expect(sunka.players().length).toEqual(2);
            expect(sunka.currentPlayer()).toEqual(1);
        });
        it('and have pots set up', function(){
            expect(sunka.allPots().length).toEqual(14);
            expect(sunka.allPots()[6].nextPot).toBe(null);
        });

        it('can take a turn', function(){
            expect(sunka.turn(1)).toBeTruthy();
            expect(sunka.potCount(1)).toEqual(1);
        });
        
    });
});
