let chalk = require('chalk');
let moment = require('moment');

const SETTINGS = require('../config/settings');

module.exports = {
    error: error,
    log: log,
    success: success,
    warning: warning
};

function error(message) {
    if (message) {
        console.log(chalk.red(getTimestamp() + message));
    }
}

function log(message) {
    console.log(getTimestamp() + message);
}

function success(message) {
    console.log(chalk.green(getTimestamp() + message));
}

function warning(message) {
    console.log(chalk.yellow(getTimestamp() + message));
}

function getTimestamp() {
    return moment.utc().format(SETTINGS.LOGS.TIMESTAMP_FORMAT) + ' - ';
}