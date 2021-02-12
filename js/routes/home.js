function home() {
	console.log('rendering home')
	fetch("/pages/home/home.html")
		.then(response => {
			return response.text()
		})
		.then(data => {
			document.querySelector("#root").innerHTML = data;
		});		
		// <title>Netflix Georgia - Watch TV Shows Online, Watch Movies Online</title>
}

export {home};