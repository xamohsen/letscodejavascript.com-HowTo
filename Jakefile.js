(function(){
    "use static";

    var jshint = require("simplebuild-jshint");
    var karma = require("simplebuild-karma");
    var KARMA_CONFIG = "karma.conf.js"
    desc("Start the karma server (run this first)");
    task("karma", function () {
        console.log("starting karma server");
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, {async: true});



    desc("default build");
    task("default",["version", "lint"], function () {
        console.log('hello, im the default task');
    });

    desc("Run a localhost server");
    task("run", function () {
        jake.exec("node node_modules/http-server/bin/http-server src", {interactive: true}, complete);
        console.log("run http server");
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
        process.stdout.write("linting js ..");
        jshint.checkFiles({
            files : ["jakefile.js", "src/**/*.js"],
            globals : {},
            options : {}
        }, complete, fail);
        jake.exec("node node_modules/jshint/bin/jshint Jakefile.js", {interactive: true}, complete);
    }, {async: true});
    desc("Run tests");
    task("test", function() {
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                "Chrome 42.0.2311 (Mac OS X 10.10.3)",
                "Firefox 37.0.0 (Mac OS X 10.10)"
            ]
        }, complete, fail);
    }, { async: true });
}());