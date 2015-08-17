/**
 * @author Nathan Richards
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'base/src/js',

    'paths': {
        'es5shim': ['libs/es5shim/es5-shim.min'],
        'jquery': 'libs/jquery/jquery.min',
        'jquery.bootstrap': 'js/libs/bootstrap.min'
    },
    'shim': {
        'jquery': {
            deps: ["es5shim"]
        },
        'jquery.bootstrap': {
            deps: ["jquery"]
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});