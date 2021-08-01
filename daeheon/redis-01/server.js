const redis = require('redis');
const client = redis.createClient();

client.set('name' , 'parkdaeheon'); //  키 : name 으로 저장 시킴  ,
client.get('name' , (err , reply) => {   // 키 name Value값 들고옴옴   결과 parkdaehon
})

client.hmset('object', 'a', 'b', 'c', 1);
client.hgetall('object', (err, obj) => {
    console.log(obj);
}); //  결과  {a: 'b' , c: '1'}



client.rpush('fruits', 'apple1', 'orange', 'apple2'); // rpush ->  자바스크립트 push
client.lpush('fruits', 'banana', 'pear'); // lpush  = 자바스크립트 unshift
client.lrange('fruits', 0, -1, (err, arr) => { //  가져 올때에는 lrange
    console.log(arr);
});  // 결과  ['pear', 'banana', 'apple', 'orange', 'apple']

client.sadd('animals', 'dog', 'cat', 'bear', 'cat', 'lion');
client.smembers('animals', (err, set) => {
    console.log(set); //  결과 ['cat', 'dog', 'bear', 'lion']
});

client.zadd('height', 180, 'zero', 168, 'aero', 176, 'nero', 172, 'hero');
client.zrange('height', 0, -1, (err, sset) => {
    console.log(sset); // 결과 ['aero', 'hero', 'nero', 'zero'
});


client.del('fruits');
client.exists('name'); // 있으면 1 없으면 0
if(client.exists('before')){
    client.rename('before', 'after'); // 키이름 변경
}

