var BASE_API_PATH = "/api/v1";
var Datastore = require("nedb");

var db = new Datastore();

var deathStats = [
	{
		"province" : "almeria",
		"year" : 2005,
		"tumor" : 1068,
		"circulatory_system_disease" : 1454,
		"respiratory_system_disease" : 573
	},
	{
		"province" : "almeria",
		"year" : 2006,
		"tumor" : 1119,
		"circulatory_system_disease" : 1279,
		"respiratory_system_disease" : 481
	},
		{
		"province" : "almeria",
		"year" : 2007,
		"tumor" : 1134,
		"circulatory_system_disease" : 1339,
		"respiratory_system_disease" : 583
	},
		{
		"province" : "almeria",
		"year" : 2008,
		"tumor" : 1131,
		"circulatory_system_disease" : 1375,
		"respiratory_system_disease" : 573
	},
		{
		"province" : "almeria",
		"year" : 2009,
		"tumor" : 1207,
		"circulatory_system_disease" : 1336,
		"respiratory_system_disease" : 489
	}
	
]

db.insert(deathStats);

module.exports = (app) => {

    //Creacion de recursos
app.get(BASE_API_PATH+"/death-stats/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(deathStats,null,2));
});

//GET a la lista de recursos
app.get(BASE_API_PATH+"/death-stats", (req,res)=>{
	
	db.find({}, (err,deathStatsInDB) => {
		if(err){
			console.error("ERROR accessing db in GET" + err);
			res.sendStatus(500); //Internal server error
		}else{
			var deathStatsToSend = deathStatsInDB.map((p) => {
				return {province : p.province, year : p.year, tumor: p.tumor, circulatory_system_disease: p.circulatory_system_disease, respiratory_system_disease: p.respiratory_system_disease}; //Devolver sin el id en postman, _id
			});
			res.send(JSON.stringify(deathStatsToSend,null,2));
		}
	});
 });

//GET a un recurso



//POST a la lista de recursos
app.post(BASE_API_PATH+"/death-stats", (req,res)=>{
    var newDeathStat = req.body;
    
    console.log(`new death stat to be added: <${JSON.stringify(newDeathStat,null,2)}>`);

	db.find({name: newDeathStat.name}, (err,deathStatsInDB) => {
		if(err){
			console.error("ERROR accessing db in POST" + err);
			res.sendStatus(500);
		}else{
			if(deathStatsInDB.length == 0){
				console.log("Inserting new death stat in DB: " +JSON.stringify(newDeathStat,null,2));
				db.insert(newDeathStat);
				res.sendStatus(201); //CREATED

			}else{
				res.sendStatus(409); //CONFLICT
			}
		}
	});
	
 });
	

//POST a un recurso, not allowed
app.post(BASE_API_PATH+"/death-stats", (req,res)=>{
    res.status(405).send("POST method not allowed");
});

//DELETE a un recursos

app.delete(BASE_API_PATH+"/death-stats/:province/:year", (req,res) =>{
	var provinceToBeDeleted = req.params.province;
	var yearToBeDeleted = req.params.year;
	db.remove({province:String(provinceToBeDeleted), year:parseInt(yearToBeDeleted)},{multi: true},(err,numDeathStatRemoved) => {
		if(err){
			console.error("ERROR deleting db contact in DELETE: " + err);
			res.sendStatus(500);
		}else{
			if(numDeathStatRemoved==0){
				res.sendStatus(404); //NOT FOUND
			}else{
				res.sendStatus(200); //OK
			}
		}
	})
})
//DELETE a la lista de recursos

app.delete(BASE_API_PATH+"/death-stats", (req,res) =>{
	db.remove({},{multi: true},(err,numDeathStatsRemoved) => {
		if(err){
			console.error("ERROR deleting db deathStats in DELETE: " + err);
			res.sendStatus(500);
		}else{
			if(numDeathStatsRemoved==0){
				res.sendStatus(404); //NOT FOUND
			}else{
				res.sendStatus(200); //OK
			}
		}
	})
})

//PUT a un recurso


//PUT lista de recursos, not allowed
app.put(BASE_API_PATH+"/death-stats", (req,res)=>{
    res.status(405).send("PUT method not allowed");
});


 };