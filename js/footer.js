fetch("../footer/footer.html")
	.then(response => {
		return response.text()
	})
	.then(data => {
		console.log(data)
		document.querySelector("footer").innerHTML = data;
	});