var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    fs = require("fs"),
    bodyParser = require('body-parser');

var serverDirectory = process.argv[2] || "/src";

function setResponse(res, content){
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(JSON.parse(content));
    res.status(200).end();
}

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + serverDirectory));

var port = 4788;
var ip = "127.0.0.1"; // change to your machines ip for other devices to access
app.listen( port, ip, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

app.get('/getdata', function(req, res){
    var filePath = req.query.file || '_default.json';
    var delay = parseInt(req.query.delay) || 0;
    setTimeout(function() {
        var content = String(fs.readFileSync(path.join( application_root, "test/data/" , filePath)));
        setResponse(res, content);
    } , delay);
});

app.post('/postdata',function(req,res){
    var filePath = req.body.file || '_default.json';
    var delay = parseInt(req.body.delay) || 0;
    setTimeout(function() {
        var content = String(fs.readFileSync(path.join( application_root, "test/data/" , filePath)));
        setResponse(res, content);
    } , delay);
});









