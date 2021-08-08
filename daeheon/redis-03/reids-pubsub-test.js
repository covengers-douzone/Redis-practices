const { expect } = require('chai');

//redis Class
const myRedis = require('./redis');

publisher = new myRedis();
subscribers = [ new myRedis(), new myRedis(), new myRedis() ];


describe("redis pub/sub Test", () => {
    before("create redis client", () => {
        //3개의 구독자
    });

    it("pub/sub message Test", done => {
        let subCnt = 0,
            msgCnt = 0,
            channelName = "room01",
            pubMsg = "Hello!";


        subscribers.forEach( subscriber => {
            //channel "HappyKoo" 구독
            subscriber.subscribe(channelName);

            //구독 완료 했을 때
            subscriber.on("subscribe", (channel, count) => {
                expect(channel).to.equal(channelName);
                if(++subCnt === subscribers.length) {
                    //메시지 전송
                    publisher.publish(channelName, pubMsg);
                }
            });

            //구독한 채널에서 메시지를 받았을 때
            subscriber.on("message", (channel, message) => {
                expect(channel).to.equal(channelName);
                expect(message).to.equal(pubMsg);
                if(++msgCnt === subscribers.length) {
                    done();
                }
            });
        });
    });

    after(() => {
        subscribers.forEach( subscriber => {
            //구독 취소
            subscriber.unsubscribe("room01")
            subscriber.quit();
        });
        publisher.quit();
    });
});
