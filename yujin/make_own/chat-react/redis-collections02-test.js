//redis-test.js
const { expect } = require('chai');

//HappyRedis Class
const myRedis = require('./redis');

let redisClient;

describe("redis collections Test", () => {
    before("create redis client", () => {
        redisClient = new myRedis();
    });

    const zkey  = "student";
    const zdata = [
        { name : "park", weight : 400 },
        { name : "kim", weight : 300 },
        { name : "lee", weight : 500 },
    ];

    it("ZSet:zadd Test", done => {
        let zvalues = [];

        zdata.forEach( data => {
            zvalues.push(data.weight);
            zvalues.push(data.name);
        });

        redisClient.zadd(zkey, zvalues, (err, affectedCnt) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(affectedCnt).to.equal(zdata.length);
            done();
        });
    });

    it("ZSet:zrangebyscore Test", done => {
        redisClient.zrangebyscore(zkey, ['-inf', '+inf'], (err, res) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(res[0]).to.equal("kim");
            done();
        });
    });

    it("ZSet:zrevrangebyscore Test", done => {
        redisClient.zrevrangebyscore(zkey, ['+inf', '-inf'], (err, res) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(res[0]).to.equal("lee");
            done();
        });
    });

    it("ZSet:zremrangebyscore Test", done => {
        redisClient.zremrangebyscore(zkey, ['-inf', '+inf'], (err, affectedCnt) => {
            if(err) {
                console.error(err);
                return done(err);
            }
            expect(affectedCnt).to.equal(zdata.length);
            done();
        });
    });

    after("redis connection close", done => {
        redisClient.quit(done);
    });
});
