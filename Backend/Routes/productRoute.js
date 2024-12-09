import express from "express";
import { deleteProduct, getAllProduct,getProductByBrandId,getProductById,getSearchProduct,getTenProduct, putProduct, getTenProductLaptop, getProductDetail, getTenProductComputer, getTenProductVGA} from '../controllers/productController.js'

const router = express.Router();
//ทำงานเมื่อได้รับ Request
// router.get('/products', getAllProduct)

router.get('/products/ten', getTenProduct)

router.get('/products/brand/:id', getProductByBrandId)

router.get('/products/:id', getProductById)

router.get('/products/search/:id', getSearchProduct)

// router.post('/products', postProuduct)

// router.put('/products/:id', putProduct)

// router.delete('/products/:id', deleteProduct)

router.get('/products/type/laptop', getTenProductLaptop)

router.get('/products/type/computer', getTenProductComputer)

router.get('/products/type/vga', getTenProductVGA)

router.get('/products/detail/:pdType/:id', getProductDetail)


export default router;
