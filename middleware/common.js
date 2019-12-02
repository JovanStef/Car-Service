const helpers = require('../helpers')
var jwt = require('jsonwebtoken');


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
    if (!helpers.keyWordValidator(req.body)) {
        var error = new Error('Wrong value for property "type"');
        error.status = 404;
        next(error)
    }
    next()
}
checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403)
    }
}
verifyToken = (req, res,next) => {
    jwt.verify(req.token, 'owner', (err, authorizedData) => {
        if(err){
            res.status(403).send('Invalid roken');
        } else {
            next()
        }
    })
}

checkRoleOwner = (req,res,next)=>{
    jwt.verify(req.token, 'owner', (err, authorizedData) => {
        let keyWord = Object.keys(authorizedData.user)[0].split('_')
    if (keyWord[0] != 'Owner') {
        res.status(403).send('Invalid authorisation');;
    }
    else {
        next();
    }
});
};

checkRoleOperator = (req,res,next)=>{
    jwt.verify(req.token, 'owner', (err, authorizedData) => {
        let keyWord = Object.keys(authorizedData.user)[0].split('_');
    if (keyWord[0] != 'Operator') {
        res.status(403).send('Invalid authorisation');;
    }
    else {
        next();
    }
});
};
module.exports = {
    logger,
    errorHandler,
    errorWrongRoute,
    emailValidator,
    redirectFunc,
    keyWord,
    adminLogger,
    checkToken,
    verifyToken,
    checkRoleOwner,
    checkRoleOperator
}