var infoEl = document.querySelector("#info-container");
var trailerEl = document.querySelector("#trailer-container");
var searchBtnEl = document.querySelector("#search-button");
var formEl = document.querySelector("#form-container");
var watchEl = document.querySelector("#watch-later-btn");

var watchHandler = function(event){

    console.log("hi");

}

var searchHandler = function(event){
    event.preventDefault();

    var movie = document.querySelector("#search-input").value

    getInfo(movie);
    getTrailer(movie);
}

var getTrailer = function(data){
    data = data.trim()
}

// Create a function to fetch movie data from the IMDB API
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

    )
            
        })
    }

    )
        
      })
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

// Create a function to store variables about the movie
var showInfo = function(title, stars, year, plot, genres, imgUrl){
    console.log(title, stars, year, plot, genres, imgUrl)
}


formEl.addEventListener("submit", searchHandler);
watchEl.addEventListener("click", watchHandler);

