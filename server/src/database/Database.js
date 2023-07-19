require('dotenv').config();
const mysql = require('mysql2');

class Database{
    host= process.env.DB_HOST;
    port= process.env.DB_PORT;
    user= process.env.DB_USER;
    password= process.env.DB_PASSWORD;
    database= process.env.DB_NAME;
    pool = null;
    promisePool = null;

    connect(){
        this.pool = mysql.createPool({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database
        });
        this.promisePool = this.pool.promise();
    } 
}

module.exports = Database;