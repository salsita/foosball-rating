const storage = require("../storage/Storage")
const { InputError } = require('../errors/InputError')

const isValidName = (name) => {
    if (name.length === 0) {
        return false
    }

    if (name.trim() !== name) {
        return false
    }

    return true
}

exports.addUser = async (user) => {
    if (!isValidName(user.name)) {
        throw new InputError("The name is not valid")
    }

    await storage.insertUser(user)
}
