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
            expect(sunka.currentPlayer()).toEqual(1);
        });

        it('can take a turn', function(){
            expect(sunka.turn(1)).toBeTruthy();
        });
        
    });
});
