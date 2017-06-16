require('./bin/database');
let express = require('express');

let app = require('./bin/server');

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/views'));

module.exports = app;