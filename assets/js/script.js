var infoEl = document.querySelector("#info-container");
var trailerEl = document.querySelector("#trailer-container");
var searchBtnEl = document.querySelector("#search-button");
var formEl = document.querySelector("#form-container");
var watchEl = document.querySelector("#watch-later-btn");

//script for youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var watchHandler = function(event){

    console.log("hi");

}

var searchHandler = function(event){
    event.preventDefault();

    var movie = document.querySelector("#search-input").value

    getInfo(movie);
    getTrailer(movie);
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

    console.log(data);

}

var getInfo = function(data){

console.log(data);



 
}


formEl.addEventListener("submit", searchHandler);
watchEl.addEventListener("click", watchHandler);

