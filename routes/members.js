const memberController = require('../controllers/members')

module.exports = server => {    
  server.get('/member/:userId', memberController.members_getById)
  server.get('/members', memberController.members_getAll)
  // server.put('/member/:userId', memberController.member_editById)
  server.del('/member/:userId', memberController.members_deleteById)
}

