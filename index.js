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
var pathsanxiety = '/api/v2/anxiety_stats';
var apiServeranxiety = 'https://sos2021-sep-jpcc.herokuapp.com/';

app.use(pathsanxiety, function (req, res) {
  var url = apiServeranxiety + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//Integracion proxy Usada 2
var pathschildren = '/api/v2/anxiety_stats';
var apiServerchildren = 'https://sos2021-sep-jpcc.herokuapp.com/';

app.use(pathschildren, function (req, res) {
  var url = apiServerchildren + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

app.use("/", express.static(path.join(__dirname,"public")));

app.listen(port, () =>{
    console.log(`Server ready listening on port ${port}`);
});