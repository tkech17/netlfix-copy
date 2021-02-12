const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");

function staticAssets(app) {
	app.use(express.static(__dirname + "/"));
}

function serveFile(filepath) {
	return (req, res) => {
		const content = fs.readFileSync(filepath).toString("utf-8");
		res.header("Content-Type", "text/html");
		res.send(content);
	};
}

staticAssets(app);
app.get("*", serveFile(__dirname + "/index.html"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});