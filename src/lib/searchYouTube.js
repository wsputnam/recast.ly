var searchYouTube = (options, callback) => {
  
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    key: window.YOUTUBE_API_KEY,
    data: options,
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
      callback(data);
    },
    error: function(data) {
      console.log(data);
      console.log('get request failed', data);
    }
  });
};
  // fetch('https://www.googleapis.com/youtube/v3/search', {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(options)
  //   key: window.YOUTUBE_API_KEY
  // }).then(function(data) {
  //   console.log(data);
  //   callback(data);
  // });


var searchYouTube = _.debounce(searchYouTube, 500);
window.searchYouTube = searchYouTube;
