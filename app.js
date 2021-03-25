const express = require('express')
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
var mysql = require('mysql');
let isDbConnected =false;
var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DB_NAME,
});


app.post('/data',(req, res)=>{
    console.log(req.body)
        var sql = 'INSERT INTO test VALUES(' + '"' + req.body.value+ '"' + ')';
        connection.query(sql, function (err, result) {
          if (err){
              console.log(err.code)
          }
          console.log(result);
        });
})
app.post('/addtolist',(req,res)=>{
    var sql = 'INSERT INTO todolist VALUES(' + '"' + req.body.action + '"' + ',' + '"' + req.body.title + '"' + ',' + '"' + req.body.date + '"' + ',' + '"' + req.body.desc + '"' + ')';
    connection.query(sql, function (err, result) {
      if (err){
          console.log(err.code)
      }
      console.log(result);
    });
})


connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Database connected..')
});

