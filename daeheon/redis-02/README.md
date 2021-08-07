> Node.js에서 Redis를 어떻게 활용 할까?

- 먼저 Node.js 서버를 열고 , redis client를 생성해준다


```javascript
const app = express();

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`)
});

const client = redis.createClient(REDIS_PORT);
```

- /reops/아이디 를 입력 하면 해당 JSON 값이 ID 값의 redis로 저장이 되어진다.

```javascript
app.get('/repos/:username',cache, getRepos); 


// 해당 json을 받아 와 key : username  values = 서버에 요청한 json 데이터를 받아 옴
const response = await fetch(`https://api.github.com/users/${username}`);
const data = await response.json();

const repos = JSON.stringify(data);

console.log(repos)

// Set to Redis
client.set(username , repos);

res.send(setResponse(username, repos));
```

- 설치파일 

```bash
npm i redis
npm i node-fetch
```





