let API_KEY = "569a2ea6";
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=569a2ea6
// details: http://www.omdbapi.com/?i=tt3896198&apikey=569a2ea6

let SearchbarBox = document.getElementById('movie-searchbar-box');
let searchbarList = document.getElementById('searchbar-list');
let counter = document.getElementById("counter");
let favarray = [];
const resultGrid = document.getElementById('result-grid');
let list=[]; 
 list = JSON.parse(localStorage.getItem('favlistarr'));

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=569a2ea6`;
    // console.log(URL);
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //  console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}
// find movies for each key press upto
function findMovies() {
    // console.log("findmovies");
    let searchTerm = (SearchbarBox.value).trim();
    if (searchTerm.length > 0) {
        searchbarList.classList.remove('hide-search-list');        //to hide the list
        loadMovies(searchTerm);
    } else {
        searchbarList.classList.add('hide-search-list');           //to add the list
    }
}
// to display the movies in the search list
function displayMovieList(movies) {
    // console.log(movies);
    searchbarList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('searchbar-list-item');
        if (movies[idx].Poster != "N/A")             //if else condn for poster
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "image-not-found.png";

        movieListItem.innerHTML = `
        <div class = "searchbar-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "searchbar-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchbarList.appendChild(movieListItem);
    }
    loadMovieDetails();
}
// function to load the movie from api
function loadMovieDetails() {
    const searchListMovies = searchbarList.querySelectorAll('.searchbar-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchbarList.classList.add('hide-search-list');
            SearchbarBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=569a2ea6`);
            const movieDetails = await result.json();
            //  console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}
// when the movie is selected
function displayMovieDetails(details) {

    resultGrid.innerHTML = "";
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image-not-found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
         <button class="btn btn-primary" id="favbtn" type="submit"
          onclick="addtofavlist(this.value)"  value=${details.imdbID}>Add To Facvourite List</button>
    </div>
    `;
}


// function to add to the favourite list
function addtofavlist(ID) {
    if (favarray.includes(ID)) {
        alert("Already Added to the Favourite List");
        return;
    }
    favarray.push(ID);

    localStorage.setItem('favlistarr', JSON.stringify(favarray));
    counterfunct(favarray);
    console.log(favarray);
}

// to count the fav list item
function counterfunct(favarray) {
    counter.innerHTML = "";
    counter.innerHTML = favarray.length;

}
counterfunct(list);
// when the click is done out of the searchbar list then to hide the list
window.addEventListener('click', (event) => {

    if (event.target.className != "form-control") {
        searchbarList.classList.add('hide-search-list');
    }
});
