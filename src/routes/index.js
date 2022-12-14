import { Router } from "express";
import productRoutes from "./productsRoutes.js"
import cartRoutes from "./cartRoutes.js"

const router = Router()

router.use ('/products' , productRoutes)
router.use ('/carts' , cartRoutes)

export default router