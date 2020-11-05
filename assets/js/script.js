// api key: 4b6a7602

function getMovie() {
    var apiUrl = "http://www.omdbapi.com/?t=The+Terminator&apikey=4b6a7602";
 
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(response) {
                displayMovieInfo(response);
        })
    })
}

function displayMovieInfo(data) {
    var movieInfo = data.Actors;
    console.log(movieInfo);
}

getMovie();