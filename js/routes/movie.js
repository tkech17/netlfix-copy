import {buildHorizontalItem, addHorizListListeners} from './allMovies.js';

function fetchSimilar() {
	fetch('/api/movies/similar.json')
		.then(response => response.json())
		.then(data => buildHorizontalItem(data))
		.then(markup => {
			document.querySelector('.lists').innerHTML = markup;
			addHorizListListeners();
		})
}

function fetchMovie(movieId) {
	console.log(`/api/movies/get/${movieId}.json`)
	return fetch(`/api/movies/get/${movieId}.json`)
		.then(response => response.json())
}


function renderMovie(movieJSON) {
	document.querySelector("iframe").src = movieJSON.url;
	document.querySelector(".title h1").innerHTML = movieJSON.name;
	document.querySelector(".description p").innerHTML = movieJSON.description;
	document.querySelector(".match-score").innerHTML = `${movieJSON.match}% Match`;
	document.querySelector(".extra-meta").innerHTML = `${movieJSON.year} ${movieJSON.length}`;
}

export function movie(movieId) {
	console.log('rendering home')
	fetch("/pages/movie/movie.html")
		.then(response => {
			return response.text()
		})
		.then(markup => {
			document.querySelector("#root").innerHTML = markup;
			fetchSimilar();
			fetchMovie(movieId).then(renderMovie);
		});		
}