define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.Model.extend({
        defaults: {
            userName: null,
            message: null,
            date: null
        }
    })
});
