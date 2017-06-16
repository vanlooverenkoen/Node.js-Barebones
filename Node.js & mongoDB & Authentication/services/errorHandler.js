const STATUS = require("../config/status");
const Logger = require("./logger");

module.exports = {errorHandling};

function errorHandling(err, res) {
    Logger.error(JSON.stringify(err));
    if (err.statusCode && err.message) {
        res.status(err.statusCode).json({message: err.message});
    } else if (err.statusCode) {
        res.sendStatus(err.statusCode);
    } else {
        res.sendStatus(STATUS.ERROR);
    }
}
