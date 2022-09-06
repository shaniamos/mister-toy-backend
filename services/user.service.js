const gUsers = require('../data/user.json')

module.exports = {
    checkLogin
}

function checkLogin(credentials) {
    const user = gUsers.find(user => user.username === credentials.username)
    return Promise.resolve(user)
}