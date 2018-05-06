// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.init();
};
  
App.prototype.init = function() {
  $(document).on('click', '.username', function(event) {
    event.preventDefault();
    this.handleUsernameClick();
  });
  $(document).on('click submit', '#send', function(event) {
    event.preventDefault();
    this.handleSubmit();
  }.bind(this));
  $(document).on('click', '.refresh', function(event) {
    event.preventDefault();
    this.fetch();
  }.bind(this));

  this.fetch();
  //event.preventDefault();
  // $('input').val();
};


App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent' );
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

App.prototype.fetch = function() { 
  $.ajax({
    url: this.server,
    type: 'GET',
    data: {
      limit: 25,
      order: '-createdAt'
    },
    dataType: 'json',
    success: function (data) {
      console.log('chatterbox: Message fetch');
      this.clearMessages();
      for ( var i = 0; i < data.results.length; i++) {
        this.renderMessage(data.results[i]);
      }
    }.bind(this),
    error: function (data) {
      console.error('chatterbox: Failed to fetch message');
    }
  });
};

App.prototype.clearMessages = function() {
  $('#chats').children().remove();
};

App.prototype.renderMessage = function(message) {

  var theChat = `<div>${message.username} : ${message.text}, ${message.createdAt}</div>`;
  $('#chats').append(theChat);

  // $('#chats').append('<div>' + message.username + ' : ' + message.text + message.createdAt + '</div>'); 
};

App.prototype.renderRoom = function(roomname) {
  $('#roomSelect').append('<div>' + roomname + '</div>');
};


App.prototype.handleUsernameClick = function(event) {
  event.preventDefault();
};

App.prototype.handleSubmit = function() {

  var obj = {
    username: this.getUserName('username'),
    text: $('input').val()
  };

  this.send(obj);
};

   
App.prototype.getUserName = function (name, url) {
  if (!url) { url = window.location.href; }
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) { return null; }
  if (!results[2]) { return ''; }
  return decodeURIComponent(results[2].replace(/\+/g, ''));
};



$(document).ready(function() {
  var app = new App();
});

        






