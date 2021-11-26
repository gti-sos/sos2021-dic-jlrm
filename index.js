var express = require("express");
var bodyParser = require("body-parser");

var PORT = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var app = express();

app.use(bodyParser.json());
app.use("/",express.static("./public"));



app.get(BASE_API_PATH+"/info/death-stats", (req,res) =>{
	res.send("<html><body><h1>Analiza la relación que existe entre las causas de muerte a nivel provincial de Andalucía comprendido entre los años 2005 y 2018</h1></body></html>");
});

app.post(BASE_API_PATH+"/info/death-stats", (req,res) =>{
	res.send("<html><body><h1>Analiza la relación que existe entre las causas de muerte a nivel provincial de Andalucía comprendido entre los años 2005 y 2018</h1></body></html>");
});

app.listen(PORT,() => {
	console.log("Server ready at port " + PORT);
});