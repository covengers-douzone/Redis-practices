//redis-test.js
const { expect } = require('chai');

//HappyRedis Class
const MyRedis = require('./redis');

let redisClient;

describe("redis collections Test", () => {
    before("create redis client", () => {
        redisClient = new MyRedis();
    });

    const data = { key : "one", val : "1" };

    it("String::set Test", done => {
        //set
        redisClient.set(data.key, data.val, (err, res) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(res).to.equal("OK");
            done();
        });
    });

    it("String::get Test", done => {
        //set
        redisClient.get(data.key, (err, value) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(value).to.equal(data.val);
            done();
        });
    });

    it("String:del Test", done => {
        redisClient.del(data.key, (err, affectedCnt) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(affectedCnt).to.equal(1);
            done();
        });
    })

    after("redis connection close", done => {
        redisClient.quit(done);
    });
});
