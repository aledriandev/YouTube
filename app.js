"use strict";

const API_KEY = "AIzaSyAlPKe5Id3BSVxyfKZT-eqnZZr2pJRE6zQ";

class App {
      // result: {
      constructor () {
            this.videos= [];
            this.selectedVideo= null;
            this.searchTerm= "Laboratoria";
      }

      init () {
            //this.videoSearch("iPhone");
            this.youtubeSearch("Laboratoria");
            this.setup();
      }
      
      setup () {
            $('#search').keyup((e) => {
                  if(e.which == 13) {
                        console.log($('#search').val());
                        this.youtubeSearch($('#search').val());
                  }
            });
      }

      getVideo (video){
            $('#video').empty();
            const url = `http://www.youtube.com/embed/${video.id.videoId}`;
            return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
      }

      getDetails (video){
            $('#details').empty();
            const title = video.snippet.title;
            const description = video.snippet.description;
            return ` <p><b>${title}</b></p>
                        <p>${description}</p>`;
                       
      } 
      //<iframe className="embed-responsive-item" src={url}> </iframe>
      getVideoList (videos) {
            $("#root").empty();
            return videos.map((video, index) => {
                  const title = video.snippet.title;
                  const description = video.snippet.description;
                  const imageUrl = video.snippet.thumbnails.default.url;
                  // this.result.selectedVideo = videos[index];
                  return `<li class="list-group-item" id=${index} onclick='this.select(this)'>
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
      }
      // select (e) => {
      //       let index = parseInt($(e).attr("id"));
      //       this.result.selectedVideo = this.result.videos[index];

      //       let video = this.getVideo(this.result.selectedVideo);
      //       let detail = this.getDetails(this.result.selectedVideo);
      //       $('#video').thisend(video)
      //       $('#details').thisend(detail);
            
      // }
      youtubeSearch (searchTerm) {
            console.log(searchTerm);

            YTSearch({ key: API_KEY, term: searchTerm }, data => {
            // console.log("result" data);
            this.videos= data;
            this.selectedVideo= data[0];
            this.searchTerm= searchTerm;
            var list = this.getVideoList(this.videos);
            let firstVideo = this.getVideo(this.selectedVideo);
            let firsDetail = this.getDetails(this.selectedVideo);
            $("#root").append(list);
            $('#video').append(firstVideo)
            $('#details').append(firsDetail);
            });
      }
};

$(document).ready(function() {
      var app = new App ();
      app.init();
});
