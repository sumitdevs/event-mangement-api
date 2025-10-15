import app from "./app.js";
import pool from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

(async ()=>{
    try{
        const client = await pool.connect();
        console.log('connected to database');
        client.release();
        app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
        });
    } catch(err){
        console.log(`failed to connect postgreSQL: ${err}`)
    }
})();