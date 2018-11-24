const query = require('../helpers/query')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.user_login = async (req, res, next) => {
  try {
    const result = await query(`SELECT user_id, fname, lname, password, email, avatar, profile, created_at FROM member WHERE email = '${req.body.email}'`) 
    if (result.length == 0) throw 'ไม่มีผู้ใช้คนนี้ในระบบ'
    const comparePasswordResult = await comparePassword(req.body.password, result[0].password)
    if (comparePasswordResult == false) throw 'รหัสผ่านผิดพลาด'
    const { user_id, email, fname, lname, avatar, profile } = result[0]
    const token = jwt.sign({
      user_id,
      email,
      fname,
      lname,
      avatar,
    }, process.env.JWT_KEY, { algorithm: process.env.JWT_ALGORITHM })          
    res.status(200)
    res.json({
      result: {
        token,
        user_id,
        email,
        fname,
        lname,
        avatar,
        profile,
      }
    })
  } 
  catch (error) {
    res.status(500)
    res.json({ error })
  }
}
exports.user_register = async (req, res, next) => {
  try {
    const { email, password, fname, lname, profile, avatar } = req.body
    const result = await query(`SELECT user_id FROM member WHERE email = '${email}'`)
    if (result.length > 0) throw 'อีเมลซ้ำ'
    const hPassword = await hashPassword(password)
    const insertMemberResult = await query(`INSERT INTO member(email, password, fname, lname, profile, avatar) VALUES('${email}', '${hPassword}', '${fname}', '${lname}', '${profile}', '${avatar}') RETURNING user_id`)
    const { user_id } = insertMemberResult[0]        
    const token = jwt.sign({
      user_id,
      email,
      fname,
      lname,
      avatar,
    }, process.env.JWT_KEY, { algorithm: process.env.JWT_ALGORITHM })          
    res.status(200)
    res.json({
      result: {
        token,
        user_id,
        email,
        fname,
        lname,
        avatar,
        profile,
      }
    })
   } 
  catch (error) {
    res.status(500)
    res.json({ error })
  }
}


const comparePassword = (newPassword, oldPassword) => {
  return new Promise ((resolve, reject) => {
    bcrypt.compare(newPassword, oldPassword, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {        
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) reject(error)
      resolve(hash)
    })
  })
}
