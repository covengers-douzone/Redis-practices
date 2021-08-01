define([
    'backbone',
    'collection/chat_logs',
    'text!template/chat.html',
    'io'
], function(
    Backbone,
    ChatLogs,
    ChatTemplate,
    io
) {
    return Backbone.View.extend({
        events: {
            "submit #chat": "public"
        },
        template: ChatTemplate,
        initialize: function() {
            _.bindAll(this, 'appendMessage', 'setName');
            this.collection = new ChatLogs(chatLogs);
            this.socket = io.connect('http://localhost:3001');
            this.socket.on("receive message", this.appendMessage);
            this.socket.on("change name", this.setName);
        },
        render: function() {
            this.$el.html(_.template(this.template)(this.collection.toJSON()));
        },
        public: function(e) {
            var $message = this.$el.find("[name=message]");
            this.socket.emit('send message', $message.val());
            $message.val("").focus();
            e.preventDefault();
        },
        appendMessage: function(result) {
            var $chatLog = this.$el.find("#chatLog");
            $chatLog.append("[" + result.date + "]" + result.userName + " : " + result.message + '\n');
            $chatLog.scrollTop($chatLog.prop("scrollHeight"));
        },
        setName: function(userName) {
            var $userName = this.$el.find("#userName");
            $userName.text(userName);
        }
    })
});
