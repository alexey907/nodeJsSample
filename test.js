var sys = require("sys"),
  my_http = require("http"),
  path = require("path"),
  url = require("url");
  mysql = require('mysql');
  
var dbCon = mysql.createConnection({
  host: "classdb.c1fc1qmtlpg9.us-west-1.rds.amazonaws.com",
  user: "master",
  password: "dEbi07oOFHaAW1s",
  database: "test1"
});
dbCon.connect( err => {
	if (err) throw err;
	sys.puts("Connected to DB");
});
  

my_http.createServer(function(req, res){
  var my_path = url.parse(req.url).pathname;

  
  sys.puts("Requested: " + my_path);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  dbCon.query("SELECT * FROM users", (err, results, fields) => {
  
  	if (err) throw err;
  	sys.puts(results[0]);
  	
  	usersData = [];
  	results.forEach (result => {
  		usersData.push ({name:result.name, id: result.id});
  	});
  	
  	res.end(JSON.stringify(usersData));
  		
  });
  
  
}).listen(9000);

sys.puts("Server Running on 9000"); 