const { expect } = require('chai');

//HappyRedis Class
const myRedis = require('./redis');

let redisClient;

describe("redis connection test", () => {
    before("create redis client", () => {
        redisClient = new myRedis();
    });

    it("SET/GET Test", done => {
        //key : HappyKoo, value : GOOD 으로 저장
        redisClient.set("hi", "world", setErr => {
            if(setErr) {
                console.error(setErr);
                return done(setErr);
            }
            redisClient.get("hi", (getErr, value) => {
                if(getErr) {
                    console.error(getErr);
                    return done(getErr);
                }
                expect(value).to.equal("world");
                done();
            });
        });

    });

    after("redis connection close", done => {
        redisClient.quit(done);
    });
});
