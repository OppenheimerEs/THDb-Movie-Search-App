
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
let results = document.getElementById('results');
let form = document.querySelector('form');
let search = document.getElementById('search');

search.focus();


const fetchMovies = async url => {
    let res = await fetch(url);
    let data = await res.json();

    let movies = data.results;

    showMovies(movies);
}

fetchMovies(API_URL);

function showMovies(movies) {

    results.innerHTML = '';

    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;

        const movieEl = document.createElement('div');
        
        movieEl.innerHTML = `
            <img src='${IMG_PATH + poster_path}'>
            <div class='movie-info'>
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
        `;
        results.append(movieEl);
    })

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        fetchMovies(SEARCH_API + searchTerm);
    }
})