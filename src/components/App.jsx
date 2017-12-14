// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <div><h5><em>videoPlayer</em> view goes here</h5></div>
//       </div>
//       <div className="col-md-5">
//         <div><h5><em>videoList</em> view goes here</h5></div>
//       </div>
//     </div>
//   </div>
// );

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
      videos: window.exampleVideoData
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
      max: 5,
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
      max: 5,
      type: 'video',
      videoEmbeddable: 'true'
    }, this.updateVideos.bind(this));
  }

  componentDidMount() {
    window.searchYouTube({
      key: window.YOUTUBE_API_KEY,
      q: 'cute cat video',
      part: 'snippet',
      max: 5,
      type: 'video',
      videoEmbeddable: 'true'
    }, this.updateVideos.bind(this));
    this.setState({
      videos: videos.items,
      videoSelected: videos.items[0]
    });
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
  </div>);
  
  }
}



// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
