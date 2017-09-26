"use strict";

const API_KEY = "AIzaSyAlPKe5Id3BSVxyfKZT-eqnZZr2pJRE6zQ";

let app = {
      result: {
            videos: [],
            selectedVideo: null,
            searchTerm: "Laboratoria"
      },

      init: function() {
            //app.videoSearch("iPhone");
            app.youtubeSearch("Laboratoria");
            app.setup();
      },
      
      setup: function () {
            $('#search').keyup(function(e) {
                  if(e.which == 13) {
                        app.youtubeSearch($('#search').val());
                  }
            });
      },

      getVideo: function (video){
            $('#video').empty();
            const url = `http://www.youtube.com/embed/${video.id.videoId}`;
            return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
      },

      getDetails: function (video){
            $('#details').empty();
            const title = video.snippet.title;
            const description = video.snippet.description;
            return ` <p><b>${title}</b></p>
                        <p>${description}</p>`;
                       
      }, 
      //<iframe className="embed-responsive-item" src={url}> </iframe>
      getVideoList: function(videos) {
            $("#root").empty();
            return videos.map((video, index) => {
                  const title = video.snippet.title;
                  const description = video.snippet.description;
                  const imageUrl = video.snippet.thumbnails.default.url;
                  // app.result.selectedVideo = videos[index];
                  return `<li class="list-group-item" id=${index} onclick='app.select(this)'>
                              <div class='row'>
                                    <div class='col-md-6 col-ls-6 col-xs-6 col-sm-6'>
                                          <img class="media-object" src=${imageUrl} /> 
                                    </div>
                                    <div class='col-md-6 col-ls-6 col-xs-6 col-sm-6'>
                                          <p><b>${title}</b></p>
                                    </div>
                              </div>
                        </li>`;
            });
      },
      select: (e) => {
            let index = parseInt($(e).attr("id"));
            app.result.selectedVideo = app.result.videos[index];

            let video = app.getVideo(app.result.selectedVideo);
            let detail = app.getDetails(app.result.selectedVideo);
            $('#video').append(video)
            $('#details').append(detail);
            
      },
      youtubeSearch: function(searchTerm) {
            console.log(searchTerm);

            YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            app.result = {
                  videos: data,
                  selectedVideo: data[0],
                  searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            let firstVideo = app.getVideo(app.result.selectedVideo);
            let firsDetail = app.getDetails(app.result.selectedVideo);
            $("#root").append(list);
            $('#video').append(firstVideo)
            $('#details').append(firsDetail);
            });
      }
};

$(document).ready(function() {
      app.init();
      

});
