module.exports = {
    DATABASE: {
        DEV: 'mongodb://127.0.0.1:27017/dev',
        TEST: 'mongodb://127.0.0.1:27017/testing',
        PROD: 'mongodb://127.0.0.1:27017/prod'
    },
    LOGS: {
        DIRECTORY: '/logs',
        SKIP_URLS: ['/assets'],
        TIMESTAMP_FORMAT: 'YYYY/MM/DD HH:mm:ss'
    },
    MAIL: {
        EMAIL: 'logfactr@gmail.com',
        ONE_TIME_PASSWORD: 'yzbfyzfpauydmawd'
    },
    PORT: process.env.PORT || 3000,
    PRODUCTION: !!process.env.PORT,
    SECRETS: {
        JWT_TOKEN_SECRET: 'YOUR-ULTRA-SECRET-PASSWORD'
    },
    URL_PREFIX: {
        AUTH: '/auth'
    }
};