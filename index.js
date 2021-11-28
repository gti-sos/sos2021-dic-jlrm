var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());


var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_v2 = "/api/v2";

var port = (process.env.PORT || 10000);
var death_stats_api = require("./src/back/v2");
var death_stats_api_v1 = require("./src/back/v1");

death_stats_api.register(app, BASE_API_PATH_v2);
death_stats_api_v1.register(app, BASE_API_PATH);


//Integracion proxy Integrada
var pathschizophrenia = '/api/v2/schizophrenia-stats';
var apiServerschizophrenia = 'https://sos2021-sep-arc.herokuapp.com/';

app.use(pathschizophrenia, function (req, res) {
  var url = apiServerschizophrenia + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//Integracion proxy Usada 1
var pathsolimpic = '/api/v2/olimpic-stats';
var apiServerolimpic = 'https://sos2021-sep-cga.herokuapp.com/';

app.use(pathsolimpic, function (req, res) {
  var url = apiServerolimpic + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//Integracion proxy Usada 2

app.use("/", express.static(path.join(__dirname,"public")));

app.listen(port, () =>{
    console.log(`Server ready listening on port ${port}`);
});