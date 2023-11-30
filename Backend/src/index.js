import app from "./app.js";
import mysql from "mysql2/promise"; 
import {PORT,DB_HOST,DB_USER,DB_NAME,DB_PASSWORD} from "./config.js"

    export const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    if(db){
        console.log("MySQL connected");
    }
    
    const port = PORT;
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });

 