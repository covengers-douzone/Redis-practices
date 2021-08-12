const model = require('../models/chat');

module.exports = {
    readAll: async function(req, res, next) {
        try {
            const results = await model.findAllUsers();
            res
                .status(200)                
                .send({
                    result: 'success',
                    data: results,
                    message: null
                });
        } catch(err){
          next(err);
        }       
    }
}
