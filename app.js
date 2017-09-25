"use strict";

const API_KEY = "AIzaSyAlPKe5Id3BSVxyfKZT-eqnZZr2pJRE6zQ";

let app = {
   result: {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
   },

   init: function() {
      //app.videoSearch("iPhone");
      app.youtubeSearch("iPhoneX");
      app.setup();
   },
   
   setup: function () {
      $('#search').keyup(function(e) {
            if(e.which == 13) {
                  $("#root").empty();
                  let searchHere = $('#search').val();
                  console.log(searchHere);
                  app.youtubeSearch($('#search').val());
            }
      });
   },
   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList: function(videos) {
      return videos.map((video, index) => {
            var title = video.snippet.title;
            // var description = video.entry.media$group.media$description.$t;
            // var viewcount = video.entry.yt$statistics.viewCount;
            // var author = video.entry.author[0].name.$t;
            const imageUrl = video.snippet.thumbnails.default.url;
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<li> 
                        <img class="media-object" src=${imageUrl} /> 
                        <p>${title}</p>
                        <p> 
                              <iframe class="embed-responsive-item" src=${url}> </iframe>
                        </p>
                  </li>`;
      });
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
         console.log("lis: ", list);
         $("#root").append(list);
      });
   },
   videoSearch: function(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         app.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });
   }
};

$(document).ready(function() {
      app.init();
      

});
