var express = require("express");
var bodyParser = require("body-parser");

var PORT = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var app = express();

app.use(bodyParser.json());
app.use("/",express.static("./public"));

var deathStats = [
	{
		"province" : "almeria",
		"year" : 2005,
		"tumor" : 1068,
		"circulatory-system-disease" : 1454,
		"respiratory-system-disease" : 573
	},
	{
		"province" : "almeria",
		"year" : 2006,
		"tumor" : 1119,
		"circulatory-system-disease" : 1279,
		"respiratory-system-disease" : 481
	},
		{
		"province" : "almeria",
		"year" : 2007,
		"tumor" : 1134,
		"circulatory-system-disease" : 1339,
		"respiratory-system-disease" : 583
	},
		{
		"province" : "almeria",
		"year" : 2008,
		"tumor" : 1131,
		"circulatory-system-disease" : 1375,
		"respiratory-system-disease" : 573
	},
		{
		"province" : "almeria",
		"year" : 2009,
		"tumor" : 1207,
		"circulatory-system-disease" : 1336,
		"respiratory-system-disease" : 489
	}
	
]

app.get(BASE_API_PATH+"/death-stats/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(deathStats,null,2));
});

app.get(BASE_API_PATH+"/info/death-stats", (req,res) =>{
	res.send("<html><body><h1>Analiza la relación que existe entre las causas de muerte a nivel provincial de Andalucía comprendido entre los años 2005 y 2018</h1></body></html>");
});

app.post(BASE_API_PATH+"/info/death-stats", (req,res) =>{
	res.send("<html><body><h1>Analiza la relación que existe entre las causas de muerte a nivel provincial de Andalucía comprendido entre los años 2005 y 2018</h1></body></html>");
});

app.listen(PORT,() => {
	console.log("Server ready at port " + PORT);
});