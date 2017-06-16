const STATUS = require('../../config/status');
const SETTINGS = require('../../config/settings');
const URL_PREFIX = SETTINGS.URL_PREFIX;
const authChecker = require("../../services/middlewareUtils").authChecker;

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const User = require('../../model/user');
const encryptionUtils = require('../../services/encryptionUtils');

module.exports = function (router) {
    router.use(setupHeaders);
    if (!SETTINGS.PRODUCTION)
        router.post(URL_PREFIX.AUTH + '/setup', setup);
    router.post(URL_PREFIX.AUTH + '/login', authenticate);
    router.use(authMiddleware);
};

function setupHeaders(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === "OPTIONS")
        res.sendStatus(STATUS.OK);
    else
        next();
}

function setup(req, res, next) {
    User.remove({}).then(() => {
    });

    const hash1 = encryptionUtils.cryptPassword('rootpassword');
    const hash2 = encryptionUtils.cryptPassword('adminpassword');

    const users = [new User({
        email: 'root@root.com',
        password: hash1,
        firstName: 'firstnameRoot',
        lastName: 'lastNameRoot',
    }), new User({
        email: 'admin@admin.com',
        password: hash2,
        firstName: 'firsnameAdmin',
        lastName: 'lastNameAdmin',
    })];

    User.insertMany(users).then(() => {
        res.status(STATUS.ACCEPTED).json({message: "Users saved/overwritten correctly"});
    });
}

function authenticate(req, res, next) {
    const body = req.body;
    User.findOne({
        email: body.email
    }).then(user => {
            if (user) {
                if (encryptionUtils.comparePassword(body.password, user.password)) {
                    const payload = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    };
                    const token = jwt.sign(payload, SETTINGS.SECRETS.JWT_TOKEN_SECRET, {
                        expiresIn: '24h'
                    });
                    res.json({
                        token: token
                    });
                } else {
                    res.status(STATUS.UNAUTHORIZED).json({message: 'Authentication failed. Wrong password.'});
                }
            } else {
                res.status(STATUS.NOT_FOUND).json({message: 'Authentication failed. User not found.'});
            }
        }
    ).catch(err => {
        if (err) throw err;
    });
}

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, SETTINGS.SECRETS.JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(STATUS.UNAUTHORIZED).json({message: 'Invalid Token'});
            } else {
                req.decoded = decoded;
                req.authenticated_user = {
                    id: decoded.id,
                    email: decoded.email,
                };
            }
            next();
        });
    } else {
        next();
    }
}