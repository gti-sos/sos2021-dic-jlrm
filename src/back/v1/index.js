var BASE_API_PATH_v1 = "/api/v1";
var Datastore = require("nedb");

var db = new Datastore();


module.exports.register = (app, BASE_API_PATH_v1) => {
 app.get(BASE_API_PATH_v1 + "/death-stats/loadInitialData", (req, res) => {
        deathStats = [
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
		"province" : "sevilla",
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
        ];

		
		//Creacion de recursos
        db.find({ $or: [{ province: "almeria" }, { province: "sevilla" }] }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    db.insert(deathStats);
                    console.log(`Loaded initial data: <${JSON.stringify(deathStats, null, 2)}>`);
                    res.sendStatus(201);
                } else {
                    console.error(`initial data already exists`);
                    res.sendStatus(409);
                }
            }
        });
    })
//Using paperwork for JSON validation
var paperwork = require("paperwork");

//Death stat schema for validation
var deathStatsSchema = {

    "province": String,
    "year": Number,
    "tumor": Number,
    "circulatory_system_disease": Number,
    "respiratory_system_disease": Number
};
	
    //Creacion de recursos
app.get(BASE_API_PATH+"/death-stats/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(deathStats,null,2));
});
	
	      db.find({ $or: [{ province: "almeria" }, { province: "sevilla" }] }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    db.insert(death_stats_data);
                    console.log(`Loaded initial data: <${JSON.stringify(death_stats_data, null, 2)}>`);
                    res.sendStatus(201);
                } else {
                    console.error(`initial data already exists`);
                    res.sendStatus(409);
                }
            }
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
   app.get(BASE_API_PATH+"/death-stats/:province/:year", function (req, res) {
        db.find({ province: req.params.province, year: parseInt(req.params.year) }, function (err, resource) {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);

            } else {
                if (resource.length != 0) {
                    var resourceToSend = resource.map(function (d) {
                        return {
                            province: d.province,
                            year: d.year,
                            tumor: d.tumor,
                            circulatory_system_disease: d.circulatory_system_disease,
                            respiratory_system_disease: d.respiratory_system_disease
                        }
                    });

                    if (resourceToSend.length == 1) {
                        res.status(200).send(resourceToSend[0]);
                    } else {
                        res.status(200).send(resourceToSend);
                    }

                } else {
                    res.sendStatus(404);
                }
            }
        });

    });


//POST a la lista de recursos
app.post(BASE_API_PATH+"/death-stats", (req, res) =>{
    var newDeathStat = req.body;
    
    console.log(`new death stat to be added: <${JSON.stringify(newDeathStat,null,2)}>`);

	db.find({name: newDeathStat.name, year:newDeathStat.year}, (err,deathStatsInDB) => {
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
    app.put(BASE_API_PATH+"/death-stats/:province/:year", paperwork.accept(deathStatsSchema), function (req, res) {

        var province = req.params.province;
        var year = parseInt(req.params.year);
        var deathStatToUpdate = req.body;

        db.update(
            {
                province: province,
                year: year
            },
            {
                $set: {

                    tumor: deathStatToUpdate.tumor,
                    circulatory_system_disease: deathStatToUpdate.circulatory_system_disease,
                    respiratory_system_disease: deathStatToUpdate.respiratory_system_disease
                }
            }
            , {}, function (err, updateDeathStat) {
                if (err) {
                    console.error("ERROR updating death stat: " + err);
                    res.sendStatus(500);
                } else {
                    if (updateDeathStat.length == 0) {
                        res.sendStatus(404);
                    } else {
                        res.status(200).send("Death Stat Updated Successfully");
                    }
                }

            });
    });

//PUT lista de recursos, not allowed
app.put(BASE_API_PATH+"/death-stats", (req,res)=>{
    res.status(405).send("PUT method not allowed");
});


 };