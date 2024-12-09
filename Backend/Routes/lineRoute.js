import * as L from '../controllers/lineNoti.js'
import express from "express"

const router = express.Router()

router.post('/lineNotification',L.sendLineMessage)

export default router