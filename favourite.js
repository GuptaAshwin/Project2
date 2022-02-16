
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=569a2ea6
// details: http://www.omdbapi.com/?i=tt3896198&apikey=569a2ea6


let favouritebarList = document.getElementById('favlistitem');
let counter = document.getElementById("counter");
let list=[]; 
 list = JSON.parse(localStorage.getItem('favlistarr'));
// console.log(list);


// to fetch the  updated list 
function  fetching(list){
    counterfunct(list);
    for (var i = 0; i < list.length; i++) {
        loadMoviesinfav(list[i]);
        // console.log(list);
    }
}
// counter function
function counterfunct(favarray) {
    counter.innerHTML = "";
    counter.innerHTML = favarray.length;

}

// loading data of  movies function
async function loadMoviesinfav(searchTerm) {
    const URL = `http://www.omdbapi.com/?i=${searchTerm}&page=1&apikey=569a2ea6`;
    // console.log(URL);
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //   console.log(data.Search);
    if (data.Response == "True") displayMovieList(data);
}
// to display the data of the movie
function displayMovieList(movies) {

    console.log(movies + "remove");
    let movieListItem = document.createElement('div');
    console.log(movies);
    movieListItem.innerHTML="";
    movieListItem.innerHTML = `
        <div id="outerbox">
        <div id="innerbox">
        <img src = "${(movies.Poster != "N/A") ? movies.Poster : "image-not-found.png"}" alt = "movie poster" id="favlistimg">
         </div> 
            <H5>${movies.Title}</H5>
            <p>${movies.Year}</p>
            <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${movies.imdbID}>Remove</button>
        
    </div>
       
        `;
    favouritebarList.appendChild(movieListItem);
}
// to remove the item from the list
function remove(value){
    for (let i = 0; i < list.length; i++) {        
        if (list[i] === value) {
            list.splice(i,1); 
        }
    }
    localStorage.setItem('favlistarr', JSON.stringify(list));
    favouritebarList.innerHTML="";
    fetching(list);
}


fetching(list);
