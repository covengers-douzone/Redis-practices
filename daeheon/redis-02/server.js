const fetch = require('node-fetch');
const redis = require('redis')

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`)
});

// Make request to GitHub for data
function setResponse(username , repos){
    return `<h2> ${username} has ${repos} <h2> `
}

function cache(req , res , next){
    const {username } = req.params;

    client.get(username , (err,data) => {
        if(err) throw err;

        if(data !== null){
            res.send(setResponse(username , data));
        }else{
            next();
        }
    })
}




async function getRepos(req, res, next) {

    try {
        console.log(`fetching Data ....`)

        const {username} = req.params;


        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        const repos = JSON.stringify(data);

        console.log(repos)

// Set to Redis
        client.set(username , repos);

        res.send(setResponse(username, repos));
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}

app.get('/repos/:username',cache, getRepos);
