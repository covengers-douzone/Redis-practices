//redis-test.js
const { expect } = require('chai');

//HappyRedis Class
const myRedis = require('./redis');

let redisClient;
describe("redis collections Test", () => {
    before("create redis client", () => {
        redisClient = new myRedis();
    });

    const hdata = {
        key : "student",
        field : "info",
        value : { a : 1, b : 2 }
    };

    it("Hash:hset Test", done => {
        redisClient.hset(hdata.key, hdata.field, JSON.stringify(hdata.value), (err, affectedCnt) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(affectedCnt).to.equal(1);
            done();
        });
    });

    it("Hash:hget Test", done => {
        redisClient.hget(hdata.key, hdata.field, (err, res) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(JSON.parse(res)).to.deep.equal(hdata.value);
            done();
        });
    });

    it("Hash:hgetall Test", done => {
        redisClient.hgetall(hdata.key, (err, res) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(JSON.parse(res.info)).to.deep.equal(hdata.value);
            done();
        });
    });

    it("Hash:hdel Test", done => {
        redisClient.hdel(hdata.key, hdata.field, (err, affectedCnt) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(affectedCnt).to.equal(1);
            done();
        });
    });

    after("redis connection close", done => {
        redisClient.quit(done);
    });
});
