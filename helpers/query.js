const { Pool } = require('pg');

const pool = new Pool({    
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,    
})

const query = sql => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await makeQuery(sql)
            resolve(result)
        }
        catch (error) {
            reject(error)
        }        
    })
}

  const makeQuery = (sql) => {    
    return new Promise ((resolve, reject) => {        
        pool.query(sql, function(error, result) {                
        if(error) reject(error)
        // pool.end()
        resolve(result.rows)
      })
    })
  }

module.exports = query