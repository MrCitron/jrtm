const express = require('express')

const playersRoute = require('./../controllers/players')

const router = express.Router()
router.get('/all', playersRoute.getPlayers)
// router.post('/create', playersRoute.Create)
// router.put('/delete', playersRoute.Delete)
// router.put('/reset', playersRoute.Reset)

module.exports = router