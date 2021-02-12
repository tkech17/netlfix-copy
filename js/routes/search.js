import {buildHorizontalItem, addHorizListListeners} from './allMovies.js';
import {randomizeApiResponse} from '../util.js'


function buildMovieHtml(movie) {
	return `
		<a href="/movie?q=${movie.id}" data-navigo>
			<img src="${movie.img}" alt="Movie ${movie.name}">
		</a>
	`;
}

function buildSearchResults(categoryData) {
	return `
		<div class="search-result-container">
			<div class="search-result">
				<div class="sectionTitle">
					<h1>${categoryData.category}</h1>
					<p>search gives random results needs backend!</p>
				</div>
				<div class="wrapListContainer">
					<div class="wrapList">
						${categoryData.movies.map(buildMovieHtml).join('\n')}
					</div>
				</div>
			</div>
		</div>
	`;
}

function search(query) {
	console.log(query)
	fetch(`/api/search/searchresult.json`)
		.then(response => response.json())
		.then(response => { // randomize stuff for more effect
			response.movies = randomizeApiResponse(response.movies, 3, 1);
			return response;
		})
		.then(data => buildSearchResults(data))
		.then(markup => {
			document.querySelector("#root").innerHTML = markup;
		})
}

export {search};