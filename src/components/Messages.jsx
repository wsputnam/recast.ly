var getComments = function (callback) {
  

  $.ajax({  
   // This is the url you should use to communicate with the parse API server.
    type: 'GET',
    data: {'order': '-createdAt'},
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
    contentType: 'application/json',
    success: function (messages) {
      callback(messages);
    },
    error: function () {
      console.error('Server not found');
    }
  });
};

  

var renderMessages = function (messages) {
  $('#chat').html('');
  console.log(messages);

  var renderMessage = function(message) {
    var $messageTemplate = $('<p class="message"><span class="username">' + message.username + '</span><span>: ' + message.text + '</span></p>');
    $('#chat').append($messageTemplate);
  };

  for (var i = 0; i < messages.results.length; i++) {
    var currentMessage = messages.results[i]; 
    if (currentMessage.username === 'sp00ky%20ghost' || currentMessage.roomname === 'All') {
      continue;
    }
    if (currentMessage.text) {
      currentMessage.text = _.escape(currentMessage.text);  
    }
    if (currentMessage.username) {
      currentMessage.username = _.escape(currentMessage.username);
    }
    renderMessage(messages.results[i]);
  }
};

window.getComments = getComments;


var postComments = function (comment) {
  var obj = {username: 'Twitch', roomname: 'TwitchRoom', text: comment};
  $.ajax({
    type: 'POST',
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
    contentType: 'application/json',
    data: JSON.stringify(obj),
    success: function(data) {
      console.log('message sent');
      console.log(comment);
      window.getComments(window.renderMessages);
    },
    error: function() {
      console.error('Server not found!');
    }
  });
};
window.postComments = postComments;