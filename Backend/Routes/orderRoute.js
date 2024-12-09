import express from "express";

import * as orderC from "../controllers/orderController.js"

const router = express.Router();

router.post('/orders', orderC.postOrders)
router.post('/orders/updateCart', orderC.updateCartCf);
router.post('/orders/updateInventory', orderC.updateInventory);

export default router;