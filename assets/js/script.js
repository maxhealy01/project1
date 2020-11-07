//api key TMDB: b7c4be357f010f43e3a269dfe7a54a8d
// api key OMDB: 4b6a7602

var infoEl = document.querySelector("#info-container");
var trailerEl = document.querySelector("#trailer-container");
var searchBtnEl = document.querySelector("#search-button");
var formEl = document.querySelector("#form-container");
var watchEl = document.querySelector("#watch-later-btn");

var movieObject = {
    title:"",
    genre: "",
    plot: "",
    poster: ""
};

var suggestionsObjectArray = [];
var j;

// var watchHandler = function(event){

// }

// var searchHandler = function(event){
//     event.preventDefault();

//      var movie = document.querySelector("#search-input").value

//     getInfo(movie);
//     getTrailer(movie);
// }

// var getTrailer = function(data){
//     data = data.trim()
// }

var getInfo = function() {
    var searchGrab = document.querySelector("#search-input").value;
    var apiUrl = "http://omdbapi.com/?t=" + searchGrab + "&apikey=4b6a7602";

    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(response) {
                movieObject.title = response.Title;
                movieObject.genre = response.Genre;
                movieObject.plot = response.Plot;
                movieObject.poster = response.Poster;

                showInfo(movieObject);
            })
        })
}

var showInfo = function(data) {
    console.log(data);
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
    var iCantBelieveIHaveToDoThisNumbersArray = [];
        
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

                    while(iCantBelieveIHaveToDoThisNumbersArray.includes(j)) {
                        j = Math.floor(Math.random() * 20);
                    }

                    iCantBelieveIHaveToDoThisNumbersArray.push(j);

                    var suggestionsObject = {
                        title: "",
                        poster: "",
                    };
                
                    suggestionsObject.title = response.results[j].title;
                    suggestionsObject.poster = "https://image.tmdb.org/t/p/w185" + response.results[j].poster_path;
                    suggestionsObjectArray.push(suggestionsObject);
                }
                showInfo(suggestionsObjectArray);
            })
        })
}

// formEl.addEventListener("submit", searchHandler);
formEl.addEventListener("submit", () => {
    getInfo();
    getSuggestions();
});
// watchEl.addEventListener("click", watchHandler);

























































// // Create a function to fetch movie data from the IMDB API
// var getInfo = function(movie){
//     movie = movie.trim().replaceAll(" ", "%20")
//     fetch("https://imdb8.p.rapidapi.com/title/auto-complete?q="+movie, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "625f8dda96msh55e651d2aaeef5bp173131jsnf81938672d82",
// 		"x-rapidapi-host": "imdb8.p.rapidapi.com"
// 	}
// })
// .then(function(response) {
//     if (response.ok) {
//       response.json().then(function(data) {
//         // Perform another API call using the ID, for more info
//         id = data.d[0].id;
//         title = data.d[0].l;
//         stars = data.d[0].s;
//         year = data.d[0].y;
//         imgUrl = data.d[0].i.imageUrl
//         console.log(data)
//         fetch("https://imdb8.p.rapidapi.com/title/get-plots?tconst="+id, {
// 	    "method": "GET",
// 	    "headers": {
// 		"x-rapidapi-key": "625f8dda96msh55e651d2aaeef5bp173131jsnf81938672d82",
// 		"x-rapidapi-host": "imdb8.p.rapidapi.com"
// 	}
// })
//     .then(function(response) {
//         response.json().then(function(data) {
//             plot = data.plots[0].text
//             // Perform a final API call for a list of genres
//             fetch("https://imdb8.p.rapidapi.com/title/get-genres?tconst="+id, {
// 	    "method": "GET",
// 	    "headers": {
// 		"x-rapidapi-key": "625f8dda96msh55e651d2aaeef5bp173131jsnf81938672d82",
// 		"x-rapidapi-host": "imdb8.p.rapidapi.com"
// 	}
// })
//     .then(function(response) {
//         response.json().then(function(data) {
//             genres = String(data)
//             showInfo(title, stars, year, plot, genres, imgUrl)
//         })
//     }

//     )
            
//         })
//     }

//     )
        
//       })
//     } else {
//       alert("Error: " + response.statusText);
//     }
//   });
// }

// // Create a function to store variables about the movie
// var showInfo = function(title, stars, year, plot, genres, imgUrl){
//     console.log(title, stars, year, plot, genres, imgUrl)

//     console.log(data);

// }

