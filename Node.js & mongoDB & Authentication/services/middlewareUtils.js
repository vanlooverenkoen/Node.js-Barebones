const STATUS = require('../config/status');

function authChecker(req, res, next) {
    if (!req.authenticated_user)
        return res.status(STATUS.UNAUTHORIZED).send({message: 'No token provided'});
    else next();
}

module.exports = {
    authChecker,
};
