//api key TMDB: b7c4be357f010f43e3a269dfe7a54a8d
// api key OMDB: 4b6a7602

var infoEl = document.querySelector("#info-container");
var trailerEl = document.querySelector("#trailer-container");
var searchBtnEl = document.querySelector("#search-button");
var formEl = document.querySelector("#form-container");
var watchEl = document.querySelector("#watch-later-btn");
var imgContainer = document.querySelector("#img-container");
var titleContainer = document.querySelector("#movie-title");
var infoContainer = document.querySelector("#info-container");
var trailerStartEl = document.querySelector("#button-container");
var mainEl = document.querySelector("mainId");

var movieObject = {
    title:"Alien",
    genre: "Horror, Sci-Fi",
    plot: "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    poster: "https://m.media-amazon.com/images/M/MV5BMmQ2MmU3NzktZjAxOC00ZDZhLTk4YzEtMDMyMzcxY2IwMDAyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    runtime: "117 min",
    year: "1979",
    rated: "R"
};

//script for youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var suggestionsObjectArray = [];
var j;

var getInfo = function() {
    
    var searchGrab = document.querySelector("#search-input").value;
    var apiUrl = "http://omdbapi.com/?t=" + searchGrab + "&apikey=344449ee";

    // Fetch from OMDB and store information inside our movie object
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(response) {
                movieObject.runtime = response.Runtime;
                movieObject.title = response.Title;
                movieObject.genre = response.Genre;
                movieObject.plot = response.Plot;
                movieObject.poster = response.Poster;
                movieObject.year = response.Year;
                movieObject.rated = response.Rated;

                showInfo(movieObject);
            })
        })
}

//API used to gather top results video id and generate an embedded youtube video of movie trailer
var getTrailer = function(movie) {    
    movie = movie.title.trim().replaceAll(" ", "%20");

    var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?q=" + movie + "%20movie%20trailer&key=AIzaSyAZf7c7gwdAy1KKOaeuRYt6Ag5KYf-Ikfc"
  
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var player;
            player = new YT.Player('player', {
                 height: '390',
                 width: '640',
                 videoId: data.items[0].id.videoId,
                 events: {
                   'onReady': onPlayerReady,
                   'onStateChange': onPlayerStateChange
                 }
            });   
            });
                    
        }
        else {
        alert("Error: " + response.statusText);
        }

    }
)};
//functionality for embeded youtube player
function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
}

var showInfo = function(data) {
    imgContainer.innerHTML = "<a href =" + data.poster + "id='movie-image-link' target='_blank' class='movie-image-link'></br><img src =" + data.poster + "id='movie-image' class='movie-image'></img>"
    titleContainer.innerHTML = data.title;
    infoContainer.innerHTML = "<p><span class='movie-detail'>Duration:</span><span id='duration'> " + data.runtime + "</span></p><p><span class='movie-detail'>Year:</span><span id='year'> " + data.year + "</span></p>" +
                        "<p><span class='movie-detail'>Rating:</span><span id='rating'> " + data.rated + "</span></p><p>" + 
                            "<span class='movie-detail'>Genre:</span><span id='duration'> " + data.genre + "</span></p><p id='synopsis' class='movie-synopsis mt-3'> " + data.plot + "</p>";
}

function stopVideo() {
    player.stopVideo();
}

var getSuggestions = function() {
    event.preventDefault();

    var searchGrab = document.querySelector("#search-input").value;
    var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=b7c4be357f010f43e3a269dfe7a54a8d&query=" + searchGrab;
 
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(response) {
                var movieArray = response.results;
                displaySuggestions(movieArray, searchGrab);
        })
    })
}

var displaySuggestions = function(movieArray, searchGrab) {
    var movieID = "";
    suggestionsObjectArray = [];
    var preventDuplicatesArray = [];
        
    for(i = 0; i < movieArray.length; i++) {
        if (movieArray[i].title === searchGrab) {
            movieID = movieArray[i].id;
            break;
        }
    }
    
    var apiUrl = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=b7c4be357f010f43e3a269dfe7a54a8d&language=en-US";
    
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(response) {
                for (i = 0; i < 5; i++) {
                    j = Math.floor(Math.random() * 20);

                    while(preventDuplicatesArray.includes(j)) {
                        j = Math.floor(Math.random() * 20);
                    }

                    preventDuplicatesArray.push(j);

                    var suggestionsObject = {
                        title: "",
                        poster: "",
                    };
                
                    suggestionsObject.title = response.results[j].title;
                    suggestionsObject.poster = "https://image.tmdb.org/t/p/w185" + response.results[j].poster_path;
                    suggestionsObjectArray.push(suggestionsObject);
                }
                // showInfo(suggestionsObjectArray);
            })
        })
}
var eventHandler = function(event){
    if(event.target.id == "watch-trailer-button"){
        getTrailer(movieObject);
    }
}
trailerStartEl.addEventListener("click", eventHandler);

formEl.addEventListener("submit", () => {  
    event.preventDefault();
    
    var video = document.querySelector("iframe");
    
    if(video!=null){
    video.parentNode.removeChild(video);}
    
    getInfo();
    getSuggestions();
});

// trailerStartEl.addEventListener("click", () => {
//     getTrailer(movieObject);   
// });

showInfo(movieObject);
