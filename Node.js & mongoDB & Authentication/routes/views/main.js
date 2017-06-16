module.exports = function (router) {
    router.get('/*', getHome);
};

function getHome(req, res) {
    res.render('index');
}