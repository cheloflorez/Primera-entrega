import { Router } from "express";
const router = Router()

import CartManager from '../controllers/cartController.js';
const CartManagers = new CartManager()


router.get("/:cid", async (req, res) => {
    const id = req.params.cid
    const data = await CartManagers.getCartById(id)
    if (data == undefined) {
        res.send("Carrito no encontrado")
    } else {
        res.send(data)
    }

});

router.post("/" , async (req , res) => {
    const obj = req.body
    const response = await CartManagers.newCart(obj)
    res.send(response)
})

router.post ("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const obj = req.body
    const response = await CartManagers.addProductCart(cid , pid , obj )
    res.send(response)
})

export default router