(function(){
    "use static";

    let jshint = require("simplebuild-jshint");
    let karma = require("simplebuild-karma");
    let shell = require("shelljs");

    const KARMA_CONFIG = "karma.conf.js";
    const DIST_DIR = "generated/dist";
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
    task("run", ["build"], function () {
        jake.exec(
            "node node_modules/http-server/bin/http-server "+ DIST_DIR,
            {interactive: true},
            complete
        );
        console.log("run http server");
    }, { async: true });

    desc("check node version");
    task("version", function () {
        console.log("checking node version: .");

        let packageJson = require("./package.json");
        let expectedVersion = "v" + packageJson.engines.node;
        let actualVersion = process.version;
        if(actualVersion !== expectedVersion) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
        console.log(process.version);
    });

    desc("lint the code");
    task("lint", function () {
        process.stdout.write("linting js ..");
        jshint.checkFiles({
            files : ["jakefile.js", "src/js/**/*.js"],
            globals : {},
            options : {}
        }, complete, fail);
        jake.exec(
            "node node_modules/jshint/bin/jshint Jakefile.js",
            {interactive: true},
            complete
        );
    }, {async: true});

    desc("Run tests");
    task("test", function() {
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                "Chrome 69.0.3497 (Linux 0.0.0)"
            ]
        }, complete, fail);
    }, { async: true });

    directory(DIST_DIR);

    desc("Build distribution directory");
    task("build",[DIST_DIR], function () {
        console.log("Building distribution directory..");

        shell.rm("-rf", DIST_DIR + "/*");
        shell.cp("src/content/*", DIST_DIR);

        jake.exec(
            "node node_modules/browserify/bin/cmd.js src/js/app.js -o " + DIST_DIR + "/bundle.js",
            {interactive: true},
            complete
        );
    }, { async: true });

    desc("Earse all generated files");
    task("clean", function () {
        console.log("Cleaning up the generated files..");
        shell.rm("-rf", "generated");
    });

}());