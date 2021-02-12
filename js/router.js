import {allMovies} from './routes/allMovies.js'
import {home} from './routes/home.js'
import {movie} from './routes/movie.js'
import {search} from './routes/search.js'
import {signedIn, notSignedIn} from './navbar.js'


window.addEventListener("load", () => {
	const router = new Navigo("/");
	window.router = router;

	router
		.on('/', (match) => {
			notSignedIn();
			home();
		})
		.on('/all', (match) => {
			signedIn();
			allMovies();
		})
		.on('/movie', (match) => {
			signedIn();
			movie(match.params.q);
		})
		.on('/search', (match) => {
			signedIn();
			search(match.params.q);
		})
		.resolve();
});	

