import User from "../auth/User.model.js"
class UserController {

    async getUserByID(id) {
        const user = await User.getUserDocByID(id)
        if (!user) {
            throw {
                code: 2,
                message: `User with id: ${id} was not found`
            }
        }
        return user
    }
}

export default new UserController()