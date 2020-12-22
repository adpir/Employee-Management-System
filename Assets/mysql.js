const mysql=require("mysql");
const db=require("../db/db.json");

const connection=mysql.createConnection ({
    host: "localhost",

    port:3306,

    user: "root",

    password: ""

});