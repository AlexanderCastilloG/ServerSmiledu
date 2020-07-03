import mysql, {Pool} from "promise-mysql";
import keys from "./keys";

const pool: Pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log("DB is connected");
    });

export default pool;