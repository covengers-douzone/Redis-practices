require.config({
    urlArgs: 'version=0.0.1',
    baseUrl: "/javascripts",
    paths: {
        jquery : 'jquery/dist/jquery.min',
        underscore : 'underscore/underscore-min',
        backbone : 'backbone/backbone-min',
        backbone_validation : 'backbone-validation/backbone-validation-min',
        moment: 'momen/min/moment.min',
        bootstrap: 'bootstrap/dist/js/bootstrap.min',
        text: 'requirejs-text/text',
        "socket.io": 'socket.io-client/dist/socket.io'
    },
    shim : {
        underscore : {
            exports : '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        backbone_validation: {
            exports: 'BackboneValidation',
            deps: ['backbone']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});
