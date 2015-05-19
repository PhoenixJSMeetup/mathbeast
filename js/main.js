// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.

require.config({
    waitSeconds: 60,
    paths: {
        jquery: 'lib/jquery/jquery-2.1.3.min',
        underscore: 'lib/underscore.min',
        backbone: 'lib/backbone.min',
        app: 'app',
        views: 'views',
        templates:'../templates',
        collections: 'collections',
        models: 'models'
    }

});

require([

    // Load our app module and pass it to our definition function
    'app', //this is the app.js file, relative to this config/main file
], function(app) {
    // The "app" dependency is passed in as "App"
    app.initialize();
});