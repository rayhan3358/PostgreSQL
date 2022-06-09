import pkg from'pg';
const { Client } = pkg;

import { users } from './users.mjs';
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'redventura',
    port: 5432,
});

client.connect();

const query = `
CREATE TABLE IF NOT EXISTS "users" (
    id INTEGER PRIMARY KEY ,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    ip INTEGER
);
`;
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    client.end();
});

const execute = async (query) => {
    try {
      await client.connect(); // gets connection
      await client.query(query); // sends queries
      return true;
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await addRow();
      await client.end(); // closes connection
    }
  };
  
  async function addRow() {
    for (let i=0;i<users.length;i++) {
        try{
            await client.query('INSERT INTO(id,fristname,lastname,email,ip)VALUE($1,$2,$3,$4,$5)RETURNING*',
            [user[i].id,users[i].fristname,users[i].lastname,users[i].email,users[i].ip]
            )
        }
        catch(err) {
            console.log(err);
        }
      
    }
}
