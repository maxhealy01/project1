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

var movieObject = {
    title,
    genre, 
    plot, 
    poster, 
    runtime, 
    year,
    rated, 
};

//script for youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const checkStatusAndParse = response =>{
    if(!response.ok)
    throw new Error (`Status code Error ${response.statusText}`)
  
    return response.json();
};
var suggestionsObjectArray = [];
var j;

var getInfo = function() {
    var searchGrab = document.querySelector("#search-input").value;
    var apiUrl = "http://omdbapi.com/?t=" + searchGrab + "&apikey=4b6a7602";

    // Fetch from OMDB and store information inside our movie object
    fetch(apiUrl)
        .then(checkStatusAndParse)
        .then(results=> {
            movieObject={}
               for(i of results){
                movieObject.push.results[i]
        } return movieObject
   })

        .catch(error=>error.statusText);

        }
//API used to gather top results video id and generate an embedded youtube video of movie trailer
let  getTrailer = function(movie) {      

    movie = movie.title.trim().replaceAll(" ", "%20");

    var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?q=" + movie + "%20movie%20trailer&key=AIzaSyAJt6A_-FzpJ3d5W9ARN1XMMQR_hqWNDVE"

    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            throw new Error(response.statusText);
        }
        return response.json()
    }
        .then(function(data) {
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

            })
                    
    )}
    .catch(error=>{
        return console.log(error.statusText);
    }) 

    

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

var getSuggestions = function(event) {
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
            if(!response.ok){
                throw new Error(`Status code error: ${response.statusText}`);
                 }returnresponse.json()
                 .then(data=>{
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
                });
                // showInfo(suggestionsObjectArray);
        
        .catch((error)=>{
            alert("Error", error);
        });
}

formEl.addEventListener("submit", () => {
    getInfo();
    getSuggestions();
});

// trailerStartEl.addEventListener("click", () => {
//     getTrailer(movieObject);
// });

showInfo(movieObject);
