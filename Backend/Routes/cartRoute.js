import express from "express"

import * as cartC from "../controllers/cartController.js"
       
const router = express.Router()
router.get('/carts/chkcart',cartC.chkCart)
router.post('/carts/addcart',cartC.postCart)
router.post('/carts/addcartdtl',cartC.postCartDtl)
router.get('/carts/sumcart',cartC.sumCart)
router.get('/carts/getcart/:id',cartC.getCart)
router.get('/carts/getcartdtl/:id',cartC.getCartDtl)
router.post('/carts/getcartbycus',cartC.getCartByCus)
router.delete('/carts/deletecart/:id',cartC.deleteCart)
router.delete('/carts/deletecartDlt/:id/:pid', cartC.deleteCartDlt)
router.get('/carts/devCf', cartC.getCartDev)

export default router
