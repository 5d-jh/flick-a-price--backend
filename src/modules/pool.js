const redis = require('redis');
const router = require('express').Router();

const client = redis.createClient('redis://redis_server:6379');

router.get('/set/:key', (req, res) => {
  client.rpush(randPoolKey, req.params.key, (err, reply) => {
    res.send(reply.toString())
  });
});

router.get('/get', async (req, res) => {
  client.lrange('a_rand_grp_key', 0, -1, (err, arr) => {
    res.send(arr);
  });
});

module.exports = router;