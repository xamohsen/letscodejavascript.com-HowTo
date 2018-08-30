(function(){
    "use static";

    var jshint = require("simplebuild-jshint");
    var karma = require("karma").server;
    desc("Start the karma server");
    task("karma", function () {
        console.log("starting karma server");
        karma.start({
            configFile: require('path').resolve('karma.conf.js')
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

}());