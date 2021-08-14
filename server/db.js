const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "GOMPYUTA",
    host: "localhost",
    port: 5432,
    database: "tariffs"
});

module.exports = pool;