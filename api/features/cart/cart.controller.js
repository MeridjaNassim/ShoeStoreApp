import Cart from "./Cart.model.js"
import { Product } from "../product/Product.model.js"
class CartController {

    async addProductsToCart(userID, productIDs) {
        const products = await Product.find({ _id: { $in: productIDs } })
        if (products.length == 0) {
            throw {
                code: 1,
                message: "No products found"
            }
        }
        let cart;
        try {
            cart = await this.getCart(userID)

        } catch (err) {
            if (err.code === 1) {
                cart = new Cart({
                    owner: userID,
                    items: {}
                })
            } else {
                throw {
                    code: 2,
                    message: err.message
                }
            }
        }
        products.forEach(product => {
            if (cart.items.get(product._id) !== undefined) {
                // increment quantity of the product if it already exist
                const obj = cart.items.get(product._id)
                const newObj = { product: obj.product, _id: obj._id, quantity: obj.quantity + 1 }
                cart.items.set(product._id, newObj)
            } else {
                // if it doesnt exist then we add it 
                const obj = {
                    product: product._id,
                    quantity: 1
                }
                cart.items.set(product._id, obj)
            }
        })
        try {
            const doc = await cart.save()
            return doc
        } catch (err) {
            throw {
                code: 3,
                message: "Error while saving cart"
            }
        }
    }
    // Get Cart
    async getCart(userId) {
        try {
            const cart = await Cart.findByUserId(userId)
            if (!cart) {
                throw {
                    code: 1,
                    message: "User does not have a cart"
                }
            }
            return cart
        } catch (err) {
            if (err.code) throw err
            throw {
                code: 2,
                message: "Error while fetching cart for user with id: " + userId
            }
        }
    }

    async updateProductQuantity(userId, productId, quantity) {
        let cart;
        try {
            cart = await this.getCart(userId)
        } catch (err) {
            throw {
                code: 1,
                message: err.message
            }
        }
        const productCart = cart.items.get(productId)
        if (!productCart) {
            throw {
                code: 2,
                message: "Product is not in the cart"
            }
        }
        const product = await Product.findById(productId)
        if (!product) {
            throw {
                code: 3,
                message: "Product does not exist"
            }
        }
        cart.items.set(productId, {
            _id: productCart._id,
            product: productCart.product,
            quantity: Math.max(1, Math.floor(Number(quantity)))
        })
        try {
            const doc = await cart.save()
            return doc
        } catch (err) {
            throw {
                code: 4,
                message: "Error while saving cart"
            }
        }
    }

}


export default new CartController()