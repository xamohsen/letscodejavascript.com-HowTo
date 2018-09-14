(function () {
    "use strict";

    var addition = require('./addition');

    describe("Addition", function () {
        it("adds positive numbers", function () {
            assertE(addition.add(3, 4), 7);
        });

        it("adds ieee 754 floating point", function () {
            assertE(addition.add(0.1, 0.2), 0.30000000000000004);
        });
        function assertE(actual, expexted) {
            if(actual !== expexted)throw new  Error ("expected" + expexted + " but found " + actual);
        }
    });

}());