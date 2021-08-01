require([
    'views/chat'
], function(
    ChatView
) {
    var chatView = new ChatView({el: '#boxApp'});
    chatView.render();
})
