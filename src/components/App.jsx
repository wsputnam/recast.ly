class App extends React.Component {
  constructor(props) {
    super(props);
    // componentDidMount() {
    //   window.searchYouTube({
    //     key: window.YOUTUBE_API_KEY,
    //     q: 'cute cat video',
    //     part: 'snippet',
    //     max: 5,
    //     type: 'video',
    //     videoEmbeddable: 'true'
    //   }, this.updateVideos.bind(this))
    // }
    this.state = {
      videoSelected: window.exampleVideoData[0],
      videos: window.exampleVideoData,
      messsages: this.getComments(this.renderMessages.bind(this))
    };
  }
  
  getComments(callback) {
    // var fetch = function (roomFilter) {
    //   var data = {'order': '-createdAt'};
    //   var dataByRoomName = {'order': '-createdAt', 'where': {'roomname': roomFilter}};
    //   if (!roomFilter) {
    //     dataByRoomName = data;
    //   }
    // }; 
    

    $.ajax({  
      // This is the url you should use to communicate with the parse API server.
      type: 'GET',
      data: {'order': '-createdAt'},
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
      contentType: 'application/json',
      success: function (messages) {
        callback(messages);
        // app.renderRooms(app.roomNames);
      },
      error: function () {
        console.error('Server not found');
      }
    });
  }

  renderMessages(messages) {
    // var escapeHTML = function(unsafeMessage) {
    //   return unsafeMessage
    //     .replace(/</g, '&lt;')
    //     .replace(/>/g, '&gt')
    //     .replace(/&/g, '&amp;')
    //     .replace(/"/g, '&quot;')
    //     .replace(/'/g, '&#039;');
    // };
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
      // if (currentMessage.roomname) {
      //   currentMessage.roomname = escapeHTML(currentMessage.roomname);
      //   if (app.roomNames[currentMessage.roomname] === undefined) {
      //     app.roomNames[currentMessage.roomname] = 1;
      //   }
      // }
      renderMessage(messages.results[i]);
    }
  }
  
  // add an on video enter event handler
  onVideoClick(video) {
    this.setState({
      videoSelected: video // data from each child element
    });
  }

  updateVideos(videos) {
    this.setState({
      videos: videos.items,
      videoSelected: videos.items[0]
    });
  }
  
  onSearchClick(query) {
    window.searchYouTube({
      key: window.YOUTUBE_API_KEY,
      q: query,
      part: 'snippet',
      max: 10,
      type: 'video',
      videoEmbeddable: 'true'
    }, this.updateVideos.bind(this));
  }

  onSearchEnter(query) {
    console.log(query);
    window.searchYouTube({
      key: window.YOUTUBE_API_KEY,
      q: query,
      part: 'snippet',
      max: 10,
      type: 'video',
      videoEmbeddable: 'true'
    }, this.updateVideos.bind(this));
  }

  componentDidMount() {
    window.searchYouTube({
      key: window.YOUTUBE_API_KEY,
      q: 'cute cat video',
      part: 'snippet',
      max: 10,
      type: 'video',
      videoEmbeddable: 'true'
    }, this.updateVideos.bind(this));
    // this.setState({
    //   videos: videos.items,
    //   videoSelected: videos.items[0]
    // });
  }
  
  render() {
    return (
    <div>
    <nav className="navbar">
      <div id="search" className="col-md-6 offset-md-3">
        <Search handleEnter={this.onSearchEnter.bind(this)} handleClick={this.onSearchClick.bind(this)} />
      </div>
    </nav>
    <div className="row">
      <div id="videoPlayer" className="col-md-7">
        <VideoPlayer video={this.state.videoSelected}/>
      </div>
      <div id="videoList" className="col-md-5">
        <VideoList handleClick={this.onVideoClick.bind(this)} videos={this.state.videos}/>
      </div>
    </div>
    <div id="chat" className="col-md-7">
      <Chat />
    </div>
  </div>);
  
  }
}



// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
