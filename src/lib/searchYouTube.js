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
      console.log('get request failed', data);
    }

  });

};

var searchYouTube = _.debounce(searchYouTube, 500);
window.searchYouTube = searchYouTube;
