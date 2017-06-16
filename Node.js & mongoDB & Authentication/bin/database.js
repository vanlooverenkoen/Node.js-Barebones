const mongoose = require('mongoose');

const Logger = require('../services/logger');
const SETTINGS = require('../config/settings');
if (SETTINGS.PRODUCTION) {
    mongoose.connect(SETTINGS.DATABASE.PROD);
} else if (process.env.NODE_ENV === 'test') {
    Logger.log('Setting up TEST database.');
    mongoose.connect(SETTINGS.DATABASE.TEST);
} else {
    Logger.log('Setting up DEV database.');
    mongoose.connect(SETTINGS.DATABASE.DEV);
}


mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', onConnectionSuccess);
db.on('error', onConnectionError);

function onConnectionSuccess() {
    Logger.success('Connection with database succeeded.');
}

function onConnectionError(err) {
    Logger.error(err);
}
