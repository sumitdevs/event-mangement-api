import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',    
    host: 'localhost',    
    database: 'ems',    
    password: '7808',  
    port: 5432,    
});


export default pool;
