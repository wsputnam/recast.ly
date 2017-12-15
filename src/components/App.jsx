class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      videoSelected: window.exampleVideoData[0],
      videos: window.exampleVideoData,
      messages: window.getComments(window.renderMessages)
    };
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

  onSubmit(query) {
    console.log(query);
    window.postComments(query);
    this.setState({
      messages: window.getComments(window.renderMessages)
    });
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
  }
  
  render() {
    return (
    <div>
    <nav className="navbar">
      <div id="search" className="col-md-6 offset-md-3">
        <Search handleEnter={this.onSearchEnter.bind(this)} handleClick={this.onSearchClick.bind(this)} />
      </div>
    </nav>
    <div id="videoPlayer" className="col-md-11">
        <VideoPlayer video={this.state.videoSelected}/>
      </div>
    <div className="row">
      <div id="videoList" className="col-md-5">
        <VideoList handleClick={this.onVideoClick.bind(this)} videos={this.state.videos}/>
      </div>
    </div>
    <div><input id="submit" type="text" autofocus></input><button onClick={(e) => this.onSubmit($('#submit').val())} id="submitButton">Submit Comment</button></div>
    <div id="chat" className="col-md-7">
        <Chat />
      </div>
  </div>);
  
  }
}

// do a post request from our input to send to server
  // call renderMessages as our callback
// fix Css formatting

// rooms


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
