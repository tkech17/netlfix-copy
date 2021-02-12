export function navbar() {
	console.log('navnav');
	document.querySelector('#search-input')
		.addEventListener('input', (e) => {
			window.router.navigate(`/search?q=${e.target.value}`);
	});
	document.querySelector('.burger-btn')
		.addEventListener('click', (e) => {
			document.querySelector('.navbar').classList.toggle('active');

	});
}

export function signedIn() {
	document.querySelector('#search-input').style.display = "flex";
	document.querySelector('.siginbtn').style.display = "none";
}


export function notSignedIn() {
	document.querySelector('#search-input').style.display = "none";
	document.querySelector('.siginbtn').style.display = "block";
}