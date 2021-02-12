import {randomizeApiResponse} from '../util.js'

function buildMovieHtml(movie) {
	return `
		<a href="/movie?q=${movie.id}" data-navigo>
			<img src="${movie.img}" alt="Movie ${movie.name}"/>
		</a>
	`;
}

function buildHorizontalItem(categoryData) {
	categoryData.movies = randomizeApiResponse(categoryData.movies, 6, 3);
	return `
		<div class="sectionTitle">
			<h1>${categoryData.category}</h1>
		</div>
		<div>
		<div  class="horizListContainer">
			<a class="prev">&#10094;</a>
			<a class="next">&#10095;</a>
			<div class="horizList">
				${categoryData.movies.map(buildMovieHtml).join('')}
			</div>
		</div>
	`;
}

function buildContent(data) {
	return data.map(buildHorizontalItem).join('\n');
}

function fetchMovies() {
	console.log('fetching movies');
	return fetch("/api/movies/all.json")
		.then(response => response.json())
		.then(data => buildContent(data));
}

function fetchHeader() {
	console.log('fetching header');
	return fetch("/api/movies/showcase.json")
		.then(response => response.json());
}

function fetchMarkup() {
	console.log('fetching markup');
	return fetch("/pages/allMovies/allMovies.html")
		.then(response => response.text());
}

function slideRight(e) {
	e.preventDefault();
	let container = e.srcElement.parentElement
	console.log(container)
	let list = container.querySelector('.horizList')
	list.scrollLeft += container.offsetWidth * 0.8
	return false;
}

function slideLeft(e) {
	e.preventDefault();
	let container = e.srcElement.parentElement
	console.log(container)
	let list = container.querySelector('.horizList')
	list.scrollLeft -= container.offsetWidth * 0.8
	return false;
}

function addHorizListListeners() {	
	document.querySelectorAll(".prev")
		.forEach( btn => btn.addEventListener('click', slideLeft));
	document.querySelectorAll(".next")
		.forEach( btn => btn.addEventListener('click', slideRight));
}

function renderHeader(headerJSON) {
	document.querySelector("#root .headerLogo img").src = headerJSON.logo;
	document.querySelector("#root .headerText p").src = headerJSON.text;
	document.querySelector("#root .headerMovie img").src = headerJSON.background;
	document.querySelector("a.play").href = `/movie?q=${headerJSON.id}`;
	document.querySelector("a.moreInfo").href = `/movie?q=${headerJSON.id}`;

	addHorizListListeners();
}

function render([markup, moviesMarkup, headerJSON]) {
	document.querySelector("#root").innerHTML = markup;
	document.querySelector("#root .lists").innerHTML = moviesMarkup;
	renderHeader(headerJSON)
}

function allMovies() {
	console.log('rendering all')
	// fetch("/pages/allMovies/allMovies.html")
	// 	.then(response => {
	// 		return response.text()
	// 	})
	// 	.then(data => {
	// 		document.querySelector("#root").innerHTML = data;
	// 	});
	// fetchMovies()
	Promise.all([fetchMarkup(), 
					fetchMovies(), 
					fetchHeader()
					]).then(render)
}

export {allMovies, buildHorizontalItem, addHorizListListeners};