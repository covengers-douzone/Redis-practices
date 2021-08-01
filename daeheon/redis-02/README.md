```bash
npm i redis
```

초기 환경
```javascript
const redis = require('redis');
const client = redis.createClient();
```

```javascript
client.set('name', 'zerocho');
client.get('name', (err, reply) => {
  console.log(reply); // zerocho
});
// set으로 설정하고 get으로 가져온다

client.hmset('friends', 'name', 'zero', 'age', 24);
client.hgetall('friends', (err, obj) => {
    console.log(obj); // { name: 'zero', age: '24' }
});

```
