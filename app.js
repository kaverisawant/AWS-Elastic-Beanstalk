const express = require('express')
var mysql = require('mysql');
// 
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
let isDbConnected =false;
var connection = mysql.createConnection({
  host     : "cloud-computing.c4mjjsqr0bqs.us-east-2.rds.amazonaws.com",
  user     : "admin",
  password : "REDcherry",
  port     :3306,
  database : "cloudcc2",
});

// djdjd

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

