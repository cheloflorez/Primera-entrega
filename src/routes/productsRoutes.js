import { Router } from "express";
const router = Router()

import ProductManager from '../controllers/productController.js';
const ProductManagers = new ProductManager()


router.get("/", async (req, res) => {
    const query = req.query.limit
    const data =  await ProductManagers.getProducts()
    if (query != undefined) {
        const nuevoArray = data.slice(0, query).map(item => item)
        res.send(nuevoArray)
    } else {
        res.send(data)
    }

});

router.get("/:pid", async (req, res) => {
    const id = req.params.pid
    const data = await ProductManagers.getProductById(id)
    if (data == undefined) {
        res.send("Producto no encontrado")
    } else {
        res.send(data)
    }

});

router.post ("/" , async (req , res) => {
    const prd = req.body
    const response = await ProductManagers.addProduct(prd)
    res.send(response)
})

router.put ("/:pid", async (req,res) => {
    const id = req.params.pid
    const prd = req.body
    const response = await ProductManagers.updateProduct(id , { prd })
    res.send (response)
})

router.delete ("/:pid" , async (req , res) => {
     const id = req.params.pid
     const response = await ProductManagers.deleteProduct(id)
     res.send(response)
})

export default router