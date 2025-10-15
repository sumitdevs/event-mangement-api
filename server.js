import app from "./app.js";
import pool from "./src/config/db.js";
import { initDB } from "./src/config/initDB.js";

const PORT = process.env.PORT || 4000;

(async ()=>{
    try{
        const client = await pool.connect();
        console.log('connected to database');
        client.release();
        app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
        initDB();
        });
    } catch(err){
        console.log(`failed to connect postgreSQL: ${err}`)
    }
})();