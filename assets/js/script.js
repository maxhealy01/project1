//api key: b7c4be357f010f43e3a269dfe7a54a8d

var infoEl = document.querySelector("#info-container");
var trailerEl = document.querySelector("#trailer-container");
var searchBtnEl = document.querySelector("#search-button");
var formEl = document.querySelector("#form-container");
var watchEl = document.querySelector("#watch-later-btn");

var watchHandler = function(event){

}

var searchHandler = function(event){
    event.preventDefault();

    var movie = document.querySelector("#search-input").value

    getInfo(movie);
    getTrailer(movie);
}

var getTrailer = function(data){

}

var getInfo = function(data){


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
    
    for(i = 0; i < movieArray.length; i++) {
        if (movieArray[i].title === searchGrab) {
            movieID = movieArray[i].id;
            break;
        }
    }
    
    var apiUrl = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=b7c4be357f010f43e3a269dfe7a54a8d&language=en-US"
    
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(response) {
                var suggestionsArray = [];

                for (i = 0; i < 5; i++) {
                    suggestionsArray.push(response.results[i].title);
                }
                console.log(suggestionsArray);
                getInfo(suggestionsArray);
            })
        })
}



formEl.addEventListener("submit", searchHandler);
formEl.addEventListener("submit", getSuggestions);
watchEl.addEventListener("click", watchHandler);

