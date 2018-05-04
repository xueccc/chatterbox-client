// YOUR CODE HERE:

var app = {};

app.init = function () {};

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {
  $.ajax({
    url: undefined,
    type: 'GET'
  });

};

app.clearMessages = function () {
  $('#chats').children().remove();
}

app.renderMessage = function(message) {
  $('#chats').append('<div>'+message+'</div>');
}

app.renderRoom = function(roomname) {
  $('#roomSelect').append('<div>'+roomname+'</div>');
}

app.handleUsernameClick = function() {
}

$('.username').click(function())
