(function () {
    "use strict";

    describe("Addition", function () {
        it("adds positive numbers", function () {
            assertE(add(3, 4), 7);
        });

        it("adds ieee 754 floating point", function () {
            assertE(add(0.1, 0.2), 0.30000000000000004);
        });
        function assertE(actual, expexted) {
            if(actual !== expexted)throw new  Error ("expected" + expexted + " but found " + actual);
        }
    });


    function add(a, b) {
        return a + b;
    }
}());