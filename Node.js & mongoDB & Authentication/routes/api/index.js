let express = require('express');
let router = express.Router();

require('./status')(router);
require('./auth')(router);

module.exports = router;