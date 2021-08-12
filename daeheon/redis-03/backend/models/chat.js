const util = require('util');
const path = require('path');
const fs = require('fs');
const dbconn = require('./dbconn');

module.exports = {

    findAllUsers : async () => {
      try{
          const readFile = util.promisify(fs.readFile).bind(fs);
          const data = await readFile(path.resolve('.', 'backend', 'models' , 'json' , 'data.json') ,'utf-8');
          return JSON.parse(data);
      }
      catch(e){
          console.error(e)
      }
        finally
        {

        }
    },


}