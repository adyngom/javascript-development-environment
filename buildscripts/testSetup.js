// register babel to transpile before test run
require('@babel/register')();

// disbale webpack features that Mocha doesn't understand
require.extensions['.css'] = function () {};
