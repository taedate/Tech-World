import express from "express"
import * as devC from '../controllers/devController.js'

const router = express.Router()
router.get('/dev/info', devC.devInfo)
router.get('/dev/products', devC.getAllProductDev)
router.post('/products/postProduct', devC.postProuduct)
router.put('/products/edit/:id', devC.putProductEdit);

export default router