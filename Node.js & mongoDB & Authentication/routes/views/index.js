let express = require('express');
let router = express.Router();

require('./main')(router);

module.exports = router;