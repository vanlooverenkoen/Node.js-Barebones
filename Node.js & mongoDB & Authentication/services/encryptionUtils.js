const bcrypt = require('bcrypt');

function cryptPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
module.exports = {
    cryptPassword,
    comparePassword
};