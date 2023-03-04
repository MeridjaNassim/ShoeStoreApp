import Cart from "./Cart.model.js"
class CartController {


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



}


export default new CartController()