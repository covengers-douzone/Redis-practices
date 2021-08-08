const conf = require('./redis-conf');
const redis = require('redis');


module.exports = class {
    constructor() {
        this._setRedis();
    }

    //set 명령 실행 추가
    set(key, value, callback) {
        this.client.set(key, value, callback);
    }

    //get 명령 실행 추가
    get(key, callback) {
        this.client.get(key, callback);
    }

    //connection close 추가
    quit(callback) {
        this.client.quit(callback);
    }

    _setRedis() {
        this._setRedisClient();

        this.client.on('connect', this._connectHandler);
        //connection error
        this.client.on('error', this._errorHandler);
        //connection close
        this.client.on('end', this._endHandler);
    }

    //error Handler 추가
    _errorHandler(err) {
        console.error("######Redis connection Error!! >>", err);
    }

    //end Handler 추가
    _endHandler() {
        console.error("######Redis connection close!!");
    }

    _connectHandler() {
        console.log("#######Redis connection!");
    }






    _setRedisClient() {
        //redis client 생성
        this.client = redis.createClient(`redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`);
        this.client.auth(`${conf.auth}`); // auth 비밀번호 설정
    }
}
