const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
const sess = {
    resave: false,
    saveUninitialized: false,
    secret: "test-session",
    name: 'test',
    cookie: {
        httpOnly: true,
        secure: false,
    },
    store: new RedisStore({ url: '127.0.0.1:6379', logErrors: true }),
    /* . store는 세션을 어디에 저장할지를 고르는 옵션
     기본값은 메모리 스토어로, 서버의 메모리에 저장
    서버가 꺼지면 세션 데이터들이 다 날아가는 것
     RedisStore로 바꾸면 이제 세션 데이터를 레디스에 저장
     즉 서버가 꺼져도 데이터가 유지된다.
     logErrors는 레디스 에러를 로깅*/

};
app.use(session(sess));
