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
    getInfo();
  /*  getTrailer();*/
}
/*
var getTrailer = function(data){
    console.log(data);
   
}
*/
var getInfo = function(data){

var movie = document.querySelector("#search-input").value
var api=`https://api.themoviedb.org/3/search/movie?api_key=7f2d779ee57cfa4df94e1e43111001a7&query=${movie}`;

fetch(api)
.then(function(response){
 if(response.ok){
 response.json()

.then(function(data){
    console.log(data);
    
    for(var i=0; i<=4 ;i++){
        E1= document.createElement('div')
        infoEl.appendChild(E1);
E1.innerHTML=`<div id="info-container" class="card container">
<div class="card-header">
<h1> Title : </h1>${data.results[i].original_title}
</div>
<img src="${data.results[i].poster_path}" />

<h1> OverView : </h1> ${data.results[i].overview} 
<h1> Popularity : </h1>${data.results[i].popularity} 
<h1>Release Date :</h1> ${data.results[i].release_date}

</div>
</br>
</br>`;

    } 
})
}
else{
console.log(error);
}
});



}


formEl.addEventListener("submit", searchHandler);
watchEl.addEventListener("click", watchHandler);

