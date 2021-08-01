define([
    'backbone',
    'model/chat_log'
], function(
    Backbone,
    ChatLog
) {
    return Backbone.Collection.extend({
        model: ChatLog
    })
});
