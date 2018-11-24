const query = require('../helpers/query')

exports.members_getAll = async (req, res, next) => { 
  try {
    const result = await query('SELECT user_id, email, fname, lname, avatar, profile, created_at FROM member')
    res.status(200)
    res.json({ result })        
  }   
  catch (error) {
    res.status(500)
    res.json({ error })
  }    
  next()
}

exports.members_getById = async (req, res, next) => {
  try {
    const { userId } = req.params
    const result = await query(`SELECT user_id, email, fname, lname, avatar, profile, created_at FROM member WHERE user_id = ${userId}`)
    res.status(200)
    res.json({ result })
  }
  catch(error) {
    res.status(500)
    res.json({ error })
  }
  next()
}