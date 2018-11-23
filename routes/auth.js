const authController = require('../controllers/auth')

module.exports = server => {
    server.post('/login', authController.user_login)
    server.post('/register', authController.user_register)
}