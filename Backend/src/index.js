import app from "./app.js";
import mysql from "mysql2/promise"; 

    export const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2524169',
      database: 'PMV',
    });

    if(db){
        console.log("MySQL connected");
    }
    
    const port = 8000;
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });

 