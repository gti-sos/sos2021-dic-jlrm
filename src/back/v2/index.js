var express = require("express");
var path = require("path");

var bodyParser = require("body-parser");
var BASE_API_PATH_v2 = "/api/v2";
var app = express();

app.use(bodyParser.json());
app.use(express.json());

var DataStore = require("nedb");
var datafile = path.join(__dirname, 'death-stats.db');
var db = new DataStore({ filename: datafile, autoload: true });


module.exports.register = (app, BASE_API_PATH_v2) => {

    var death_stats_data = [];

    app.get(BASE_API_PATH_v2 + "/death-stats/loadInitialData", (req, res) => {
        death_stats_data = [
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
                    db.insert(death_stats_data);
                    console.log(`Loaded initial data: <${JSON.stringify(death_stats_data, null, 2)}>`);
                    res.sendStatus(201);
                } else {
                    console.error(`initial data already exists`);
                    res.sendStatus(409);
                }
            }
        });
    })
	
    app.get(BASE_API_PATH_v2 + "/death-stats", (req, res) => {

        var query = req.query;

        //Aquí se obtienen offset y limit con query, si son null, le hacemos un delete y listo.
        var limit = parseInt(query.limit);
        var offset = parseInt(query.offset);

        //Deleteamos los offset y limit.
        delete query.offset;
        delete query.limit;

        //Parseamos a integer.
        if (query.hasOwnProperty("year")) {
            query.year = parseInt(query.year);
            console.log(query.year);
        }
        if (query.hasOwnProperty("tumor")) {
            query.tumor = parseInt(query.tumor);
            console.log(query.tumor);
        }
        if (query.hasOwnProperty("circulatory_system_disease")) {
            query.circulatory_system_disease = parseInt(query.circulatory_system_disease);
            console.log(query.circulatory_system_disease);
        }
        if (query.hasOwnProperty("respiratory_system_disease")) {
            query.respiratory_system_disease = parseInt(query.respiratory_system_disease);
            console.log(query.respiratory_system_disease);
        }

        console.log(query);

        db.find(query).skip(offset).limit(limit).exec((error, death_stats) => {
            death_stats.forEach((n) => {
                delete n._id;
            });

            if (death_stats.length < 0) {
                res.sendStatus(400, "Bad request");
                console.log("Requested data is INVALID");
            }
            else {
                res.send(JSON.stringify(death_stats, null, 2));
                console.log("Data sent:" + JSON.stringify(death_stats, null, 2));

            }
        });
    });


    app.post(BASE_API_PATH_v2 + "/death-stats", (req, res) => {
        var data = req.body;
        var province = req.body.province;
        var year = req.body.year;

        db.find({ "province": province, "year": year }).exec((error, death_stats) => {
            if (death_stats.length > 0) {
                res.sendStatus(409);
                console.log("There's an object with those primary keys");
                return;
            }
            if ((data == null)
                || (data.province == null)
                || (data.year == null)
                || (data.tumor == null)
                || (data.circulatory_system_disease == null)
                || (data.respiratory_system_disease == null)
                || ((Object.keys(data).length != 5))) {

                res.sendStatus(400, "Falta uno o más campos");
                console.log(data);
                console.log("POST not created");
                return;
            }
            db.insert(data);

            res.sendStatus(201, "Post created");
            console.log(JSON.stringify(data, null, 2));
        });
    });

    app.get(BASE_API_PATH_v2 + "/death-stats/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);

        db.find({ "province": province, "year": year }).exec((err, param) => {
            if (param.length == 1) {
                delete param[0]._id;
                // return res.sendStatus(404);
                res.send(JSON.stringify(param[0], null, 2));
                console.log("/GET - Recurso Específico /province/year: " + JSON.stringify(param[0]), null, 2);
            }
            else {
                res.sendStatus(404, "Not found");
            }
        });

    });


    app.delete(BASE_API_PATH_v2 + "/death-stats/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);

        db.remove({ "province": province, "year": year }, { multi: true }, (err, paramsDeleted) => {
            if (paramsDeleted == 0) {
                res.sendStatus(404, "Not found");
            }
          
            else {
                res.sendStatus(200);
            }
        });
    });


    app.put(BASE_API_PATH_v2 + "/death-stats/:province/:year", (req, res) => {
      
        var provinceData = req.params.province; //Pillar el contenido después de los dos puntos.
        var provinceD = req.body.province;

        var yearData = parseInt(req.params.year);
        var yearD = parseInt(req.body.year);

        var body = req.body;
        if (provinceData != provinceD || yearData != yearD) {
            res.sendStatus(409);
            console.warn("There is a conflict!");
        }
        else {
            db.update({ "province": provinceData, "year": yearData }, body, (err, paramsUpdated) => {
                if (paramsUpdated == 0) {
                    res.sendStatus(404, "Not found");
                }
                else {
                    res.sendStatus(200);
                    console.log("PUT Correcto");
                }
            });
        }
    });
    /*}
 }); */


    app.post(BASE_API_PATH_v2 + "/death-stats/:province/:year", (req, res) => {
        console.log("POST no valido/encontrado");
        return res.sendStatus(405);

    });


    app.put(BASE_API_PATH_v2 + "/death-stats", (req, res) => {
        console.log("PUT no valido/encontrado");
        return res.sendStatus(405);

    });


    app.delete(BASE_API_PATH_v2 + "/death-stats", (req, res) => {

        db.remove({}, { multi: true }, (error, death_stats_deleted) => {
            console.log(death_stats_deleted + " death_stats deleted");
        });
        res.sendStatus(200, "OK");

    });


};