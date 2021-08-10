
const logger = require('../logging');

module.exports = {
    error404: function(req, res) {
        if(req.accepts('html')) {
            res.status(404).render('error/404')
            return;
        }

        res.status(404).send({
            result: 'fail',
            data: null,
            message: 'unknown request'
        });        
    },
    error500: function(err, req, res, next) {
        logger.error(err.stack);

        if(req.accepts('html')) {
            res.status(500).render('error/500', {
                     error: err.stack
            });
            return;
        }

        res.status(500).send({
            result: 'fail',
            data: null,
            message: err.stack
        });
    }
}