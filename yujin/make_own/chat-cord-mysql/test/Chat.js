const dotenv = require('dotenv');
const path = require('path');
const assert = require('assert').strict;

dotenv.config({path:path.join(path.resolve(__dirname,'..'), 'config/db.env')});

describe('Model Chat', function(){
    let models = null;
    before(async function(){
        models = require('../models');
    });

    it('Test',async function(){
        const chat = await models.Chat.findOne({
            where: {
                no: 1
            }
        });
        assert.equal(chat.no,1);
    })

    after(async function(){

    });
});

const models = require('../models');