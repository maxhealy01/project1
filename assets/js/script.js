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
    console.log(data);

}

var getInfo = function(data){

console.log(data);



}


formEl.addEventListener("submit", searchHandler);
watchEl.addEventListener("click", watchHandler);

