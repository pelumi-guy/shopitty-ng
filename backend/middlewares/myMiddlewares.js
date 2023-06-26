exports.logRequestBody = (req, res, next) => {
    console.log('Request body: ', req.body)

    next();
}