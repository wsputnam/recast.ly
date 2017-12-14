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
    },
    error: function() {
      console.log('get request failed');
    }

  });

};

window.searchYouTube = searchYouTube;
