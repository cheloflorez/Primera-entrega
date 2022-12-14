import fs, { promises } from 'fs'

class ProductManager {

    constructor() {
        this.path = 'productos.json'
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
            const id = lastEvent.id + 1

            return id
        } else {

            return 1
        }
    }

    addProduct = async (prd) => {
        const { title, description, price, thumbnail, code, stock, status, category } = prd
        if (title, description, price, code, stock, status, category) {
            const data = await this.readFile()
            const encontrado = data.find(prd => prd.code === code);
            if (encontrado) return ("Producto ya existe")
            else {
                const id = this.getNextID(data)
                const producto = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    status,
                    category
                }
                data.push(producto)
                await this.write(data)
                return ("Producto creado exitosamente")
            }
        }
        else return ("Ingrese todos los campos")
    }

    updateProduct = async (id, { prd }) => {
        const { title, description, price, thumbnail, code, stock, status, category } = prd
        if (title, description, price, code, stock, status, category) {
            const data = await this.readFile()
            const index = data.findIndex((el) => el.id == id);
            if (index != -1) {
                data[index].title = title
                data[index].description = description
                data[index].price = price
                data[index].thumbnail = thumbnail
                data[index].code = code
                data[index].stock = stock
                data[index].status = status
                data[index].category = category
                await this.write(data)
                return ("Producto actualizado correctamente")
            }
            else {
                return ("Producto no existe en la Base de datos")
            }
        } else {
            return ("Ingrese todos los campos")
        }
    }

    getProductById = async (id) => {
        const data = await this.readFile()
        const result = data.find(p => p.id == id)
        return result
    }

    getProducts = async () => {
        const data = await this.readFile()
        return data
    }

    deleteProduct = async (id) => {
        const data = await this.readFile()
        const prddelete = data.findIndex(p => p.id == id)
        if (prddelete != -1) {
            data.splice(prddelete, 1)
            await this.write(data)
            return ("Producto eliminado correctamente")
        }

        else {
            return ("Producto no encontrado en la Base de Datos")
        }
    }
}

export default ProductManager