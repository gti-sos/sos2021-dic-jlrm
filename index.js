var express = require("express");

var app = express();


var port = process.env.PORT || 10000;

app.use("/", express.static("./public"));

app.get("/hello", (req, res) => {
	res.send("<html><body><h1>GET Hello from this tiny server</h1></body></html>");
})

app.post("/hello", (req, res) => {
	res.send("<html><body><h1>POST Hello from this tiny server</h1></body></html>");
})

app.listen(port,() => {
	console.log(`DENTRO CALLBACK - Server listening on port ${port}`);
});