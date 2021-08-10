const express = require('express')
const redis = require('redis')

const publisher = redis.createClient()

const app = express()

// routing
app.get('/',(req,res) => {
    const data = {
        full: 'node'
    }
    publisher.publish("subscriber-notify",JSON.stringify(data));
    res.send("Publisher sent event via Redis");
})

// port
app.listen(8000, () => `jRunning at PORT 8000`)