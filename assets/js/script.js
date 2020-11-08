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

//script for youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var watchHandler = function(event){


var suggestionsObjectArray = [];
var j;

var getInfo = function() {
    var searchGrab = document.querySelector("#search-input").value;
    var apiUrl = "http://omdbapi.com/?t=" + searchGrab + "&apikey=4b6a7602";

    // Fetch from OMDB and store information inside our movie object
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
//API used to gather top results video id and generate an embedded youtube video of movie trailer
var getTrailer = function(movie){      

    movie = movie.trim().replaceAll(" ", "%20");

    var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?q=" + movie + "%20movie%20trailer&key=AIzaSyAJt6A_-FzpJ3d5W9ARN1XMMQR_hqWNDVE"

    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
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


var showInfo = function(data) {
    console.log(data);
}

var getSuggestions = function() {
    event.preventDefault();

  }
function stopVideo() {
    player.stopVideo();
}

var getInfo = function(movie){
    movie = movie.trim().replaceAll(" ", "%20")
    fetch("https://imdb8.p.rapidapi.com/title/auto-complete?q="+movie, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "625f8dda96msh55e651d2aaeef5bp173131jsnf81938672d82",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
.then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // Perform another API call using the ID, for more info
        id = data.d[0].id;
        title = data.d[0].l;
        stars = data.d[0].s;
        year = data.d[0].y;
        imgUrl = data.d[0].i.imageUrl
        console.log(data)
        fetch("https://imdb8.p.rapidapi.com/title/get-plots?tconst="+id, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "625f8dda96msh55e651d2aaeef5bp173131jsnf81938672d82",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
    .then(function(response) {
        response.json().then(function(data) {
            plot = data.plots[0].text
            // Perform a final API call for a list of genres
            fetch("https://imdb8.p.rapidapi.com/title/get-genres?tconst="+id, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "625f8dda96msh55e651d2aaeef5bp173131jsnf81938672d82",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
    .then(function(response) {
        response.json().then(function(data) {
            genres = String(data)
            showInfo(title, stars, year, plot, genres, imgUrl)
        })
    }


    var searchGrab = document.querySelector("#search-input").value;
    var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=b7c4be357f010f43e3a269dfe7a54a8d&query=" + searchGrab;
 
    // Movies on TMBD can't be searched individually like they can be on OMDB, so this searches for the movie on TMDB and gets an array of every movie containing what was searched 
    // for. For instance, "Avatar" will return Avatar and Avatar: The Last Airbender. 
    //
    // The reason to do this is because TMDB actually has a query to get a list of recommended movies, while OMBD does not.
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
        
    // This for loop searches for the first movie in the array that matches the search. Unfortunately, there are some movies with the same name. There are two Avatar movies, for
    // instance. Oh well. This returns the id number of what is most likely the most relevant search.
    for(i = 0; i < movieArray.length; i++) {
        if (movieArray[i].title === searchGrab) {
            movieID = movieArray[i].id;
            break;
        }
    }
    
    // Now we use the recommendations query, which requires a movieID. This, unfortunately, can't be searched by title. 
    var apiUrl = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=b7c4be357f010f43e3a269dfe7a54a8d&language=en-US";
    

    // The recommendation query gives us an array of 20 recommended movies. This section randomly grabs five from the array and pushes them into an object array with the poster image
    // and title as data fields. 
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
                showInfo(suggestionsObjectArray);
            })
        })
}

//feature/showInfo
// formEl.addEventListener("submit", () => {
//     getInfo();
//     getSuggestions();
// });

// var getTrailer = function(data){
// feature/getInfo
//     data = data.trim()
// }

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
// >>>>>>> main






// feature/showInfo
// 
//  main
// }
//  main





























// formEl.addEventListener("submit", searchHandler);

// watchEl.addEventListener("click", watchHandler);

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

 
}


//     console.log(data);

// }

