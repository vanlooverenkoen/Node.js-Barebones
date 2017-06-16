const STATUS = require('../../config/status');

module.exports = function (router) {
    router.get('/status', checkStatus);
};

function checkStatus(req, res, next) {
    const html = '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg"><br>' +
        '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/contains-cat-gifs.svg"><br>' +
        '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/designed-in-ms-paint.svg"><br>' +
        '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/made-with-crayons.svg"><br>' +
        '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/powered-by-water.svg"><br>' +
        '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/validated-html2.svg"><br>' +
        '<img style="width: 100%; margin-bottom: 1em;" src="http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg"><br>';
    return res
        .status(STATUS.OK)
        .send(html);
}