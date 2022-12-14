import fs, { promises } from 'fs'

import ProductManager from '../controllers/productController.js';
const ProductManagers = new ProductManager()

class CartManager {

    constructor() {
        this.path = 'cart.json'
    }

    readFile = async () => {
        if (fs.existsSync(this.path)) {
            return promises.readFile(this.path, 'utf-8')
                .then(data => JSON.parse(data))
        }
        return []
    }

    write = list => {
        return promises.writeFile(this.path, JSON.stringify(list))
    }

    getNextID = (data) => {
        const count = data.length

        if (count > 0) {
            const lastEvent = data[count - 1]
            const id = lastEvent.cid + 1

            return id
        } else {

            return 1
        }
    }

    getCartById = async (cid) => {
        const data = await this.readFile()
        const result = data.find(p => p.cid == cid)
        return result
    }

    newCart = async (obj) => {
        const data = await this.readFile()
        const cid = this.getNextID(data)
        const product = []
        const prdExist = await ProductManagers.getProductById(obj.pid)
        if (prdExist && obj.quantity != 0) {
            let prd = {
                pid: obj.pid,
                quantity: obj.quantity
            }
            product.push(prd)
            const cart = {
                cid: cid,
                products: product
            }
            data.push(cart)
            await this.write(data)
            return ("Carrito creado con exito")
        }
        else {
            return ("El producto no existe o la cantidad seleccionada es 0")
        }
    }

    addProductCart = async (cid, pid, obj) => {
        const data = await this.readFile()
        const encontrado = data.find(prd => prd.cid == cid);
        if (encontrado) {
            const prdExist = encontrado.products.findIndex((el) => el.pid == pid)
            if (prdExist != -1) {
                encontrado.products[prdExist].quantity = encontrado.products[prdExist].quantity + obj.quantity
            } else {
                const newPrd = {
                    pid: pid,
                    quantity: obj.quantity
                }
                encontrado.products.push(newPrd)
            }
            await this.write(data)
            return ("Producto actualizado o creado correctamente")
        }
        else {
            return ("Carro de compras no encontrado")
        }
    }

}

export default CartManager