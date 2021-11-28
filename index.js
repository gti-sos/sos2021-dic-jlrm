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

app.use("/", express.static(path.join(__dirname,"public")));

app.listen(port, () =>{
    console.log(`Server ready listening on port ${port}`);
});