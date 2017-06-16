const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const moment = require('moment');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const FileStreamRotator = require('file-stream-rotator');
const exphbs = require('express-handlebars');

const Logger = require('../services/logger');
const SETTINGS = require('../config/settings');

const app = express();

app.set('env', SETTINGS.PRODUCTION ? 'production' : 'development');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestLogger());

app.set('views', path.join(__dirname, '../', 'views'));
app.engine('hbs', exphbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use('/uploads', express.static('uploads'));

app.listen(SETTINGS.PORT, () => {
    Logger.log('App running on port ' + SETTINGS.PORT + '...');
});

function requestLogger() {
    morgan.token('datetime', (req, res) => {
        return moment.utc().format(SETTINGS.LOGS.TIMESTAMP_FORMAT);
    });

    morgan.token('met', (req, res) => {
        return req.method.substr(0, 3);
    });

    return morgan(':datetime - :status :met :url (:response-time ms)', loggerOptions());
}

function loggerOptions() {
    let options = {
        skip: (req, res) => {
            const skipUrl = SETTINGS.LOGS.SKIP_URLS.some(path => {
                return req.originalUrl.indexOf(path) === 0;
            });

            return (req.method === 'OPTIONS') || (req.method === 'GET' && skipUrl)
        }
    };

    if (SETTINGS.PRODUCTION) {
        const logDirectory = path.join(__dirname, '../', SETTINGS.LOGS.DIRECTORY);

        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        options.stream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: path.join(logDirectory, 'requests-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        });
    }

    return options;
}

module.exports = app;