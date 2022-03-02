const TMDB_API = 'd8bf019d0cca372bd804735f172f67e8';
const TMDB_ENDPOINT = 'https://api.themoviedb.org';
const TMDB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';

function generateUrl(path) {
    const url = `${TMDB_ENDPOINT}/3${path}?api_key=${TMDB_API}`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((response) => response.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovies(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    const render = renderMovies.bind({ title : 'Upcoming Movies'});
    requestMovies(url, render, handleError);
}

function getTopRatesMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({ title : 'Top Rated Movies'});
    requestMovies(url, render, handleError);
}

function getPopularMovies() {
    const path = '/movie/popular';
    const url = generateUrl(path);
    const render = renderMovies.bind({ title : 'Popular Movies'});
    requestMovies(url, render, handleError);
}

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector("#movies-container");

function movieSection(movies) {
    const section = document.createElement('section');
    section.classList = 'section';

    movies.map((movie) => {
        if (movie.poster_path){
            const img = document.createElement('img');
            img.src = TMDB_IMAGE_ENDPOINT + movie.poster_path;;
            img.setAttribute('data-movie-id', movie.id);

            section.appendChild(img);
        }
    })

    return section;
}

function createMovieContainer(movies, title="") {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = document.createElement('h2');
    header.innerHTML = title;

    const content = document.createElement('div');
    content.classList = 'content';

    const contentClose = `<p id="content-close">X</p>`;

    content.innerHTML = contentClose;

    const section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    return movieElement;
}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
}

function renderMovies(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
}

function handleError(error) {
    console.log('Error', error);
}

buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovies(value);

    fetch(newUrl)
        .then((response) => response.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error: ', error);
        });

    inputElement.value = '';
    console.log("Value: ", value);
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}

function createVideoTemplate(data, content) {
    content.innerHTML = '<p id="content-close">X</p>';
    console.log('Videos: ', data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

document.onclick = function(event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);

        fetch(url)
            .then((response) => response.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }

}

getUpcomingMovies();
getTopRatesMovies();
getPopularMovies();