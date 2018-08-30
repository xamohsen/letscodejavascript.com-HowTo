(function(){
    "use static";


    desc("default build");
    task("default",["version", "lint"], function () {
        console.log('hello, im the default task');
    });

    desc("check node version");
    task("version", function () {
        console.log("checking node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = "v" + packageJson.engines.node;
        var actualVersion = process.version;
        if(actualVersion !== expectedVersion) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
        console.log(process.version);
    });

    desc("lint the code");
    task("lint", function () {
        console.log("linting js ..");
        jake.exec("node node_modules/jshint/bin/jshint Jakefile.js", {interactive: true}, complete);
    }, {async: true});

}());