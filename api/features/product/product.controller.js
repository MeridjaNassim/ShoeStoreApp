import { validateCreateProduct } from "../../util/validation.js"
import { Product } from "./Product.model.js"

class ProductController {

    async getAllProducts() {
        try {
            return await Product.getAllProductDocs()
        } catch (err) {
            throw {
                code: 1,
                message: "Error while fetching product documents"
            }
        }
    }

    async getProductByID(id) {
        const product = await Product.getProductDocByID(id)
        if (!product) {
            throw { 
                code : 1,
                message : `Product with id: ${id} was not found`
            }
        }
        return product

    }
    async createNewProduct({
        name,
        description,
        image,
        size,
        color,
        category,
        price,
        rating,
    }) {
        // validate creation inputs
        const { error } = validateCreateProduct({
            name,
            description,
            image,
            size,
            color,
            category,
            price,
            rating,
        })
        if (error) {
            throw {
                code: 1,
                message: error.details[0].message
            }
        }

        const product = new Product({
            name,
            description,
            image,
            size,
            color,
            category,
            price,
            rating,
        })
        try {
            const doc = await product.save()
            return doc
        } catch (err) {
            throw {
                code: 2,// MongoDB Error while saving
                message: "Error while saving new product"
            }
        }
    }
}


export default new ProductController()