 const mysql=require("mysql");
 

 const connection=mysql.createConnection ({
     host: "localhost",

     port: 3306,

     user: "root",

    password: "bor!cu@_PR33",
    database: "employee_tracker_db",
   

 });
 connection.connect(function(err) {
     if (err) throw err;
     console.log("connected as id " + connection.threadId);
     
 });

 module.exports = connection;