//Conector de mariadb
const mariadb = require('mariadb')

//crear conexion
const pool = mariadb.createPool({
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
})

//metodo para establecer la conexion
module.exports = Object.freeze({
    pool: pool
})