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

//Creacion de recursos
app.get(BASE_API_PATH+"/death-stats/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(deathStats,null,2));
});

//GET a la lista de recursos
app.get(BASE_API_PATH+"/death-stats", (req,res) =>{
	res.send(JSON.stringify(deathStats,null,2));
});

//GET a un recurso



//POST a la lista de recursos
app.post(BASE_API_PATH+"/death-stats", (req,res)=>{
    var newDeathStat = req.body;
    
    console.log(`new contact to be added: <${JSON.stringify(newDeathStat,null,2)}>`);

    contacts.push(newDeathStat);

    res.sendStatus(201);
 });
	

//POST a un recurso, not allowed
app.post(BASE_API_PATH+"/death-stats", (req,res)=>{
    res.status(405).send("POST method not allowed");
});

//DELETE a un recursos

app.delete(BASE_API_PATH+"/provinceName/:year", (req,res) =>{
    var provinceName = req.params.provinceName;
	var year = req.params.year;
	db.remove({province:provinceName, year:year},{},(err,numProvincesRemoved) => {
		if(err){
			console.error("ERROR deleting db province in DELETE: " + err);
			res.sendStatus(500);
		}else{
			if(numProvincesRemoved==0){
				res.sendStatus(404); //NOT FOUND
			}else{
				res.sendStatus(200); //OK
			}
		}
	})
})
//DELETE a la lista de recursos
app.delete(BASE_API_PATH+"/death-stats/", (req,res)=>{
    deathStats = [];
    
	console.log(`all provinces were removed`);

    res.sendStatus(200);
 });
//PUT a un recurso


//PUT lista de recursos, not allowed
app.put(BASE_API_PATH+"/death-stats", (req,res)=>{
    res.status(405).send("PUT method not allowed");
});

app.listen(PORT,() => {
	console.log("Server ready at port " + PORT);
});