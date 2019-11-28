const helpers = require('../helpers')


logger = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} --${new Date()}`)
    next()
};
adminLogger = (req, res, next) => {
    console.log(`ADMIN ${req.url} ${req.method} --${new Date()}`)
    next()
};
errorHandler = (err, req, res, next) => {
    var errObj = {
        status: err.status,
        error: {
            message: err.message
        }
    }
    res.status(err.status || 500).send(errObj);
};

errorWrongRoute = (req, res, next) => {
    var error = new Error('Route not found!');
    error.status = 404;
    next(error);
};
emailValidator = (req, res, next) => {
    if (!helpers.emailValidator(req.body.email)) {
        var error = new Error('Please enter a valid email');
        error.status = 404;
        next(error);
    };
    next()
};
redirectFunc = (req, res, next) => {
    res.redirect('/owners')
};

keyWord = (req, res, next) => {
    console.log(req.body)
    if (!helpers.keyWordValidator(req.body)) {
        var error = new Error('Wrong value for property "type"');
        error.status = 404;
        next(error)
    }
    next()
}

module.exports = {
    logger,
    errorHandler,
    errorWrongRoute,
    emailValidator,
    redirectFunc,
    keyWord,
    adminLogger
}