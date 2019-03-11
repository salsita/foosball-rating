const storage = require("../storage/storage")
const { InputError } = require('../errors/input-error')

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

    storage.insertUser(user)
}
