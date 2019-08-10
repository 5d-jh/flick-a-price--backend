const router = require('express').Router();
const redis = require('./modules/db_redis');
const mongo = require('./modules/db_mongo');

router.use((req, res, next) => {
  if (!req.session.email) {
    return res.status(403).send('Session info missing');
  }
  next();
});

router.post('/create', async (_, res) => {
  try {
    const result = await redis.set(new Date().getTime().toString(16), '1');
    await mongo.update(mongo.model.User, { email: req.session.email }, { poolkey });
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

router.get('/join', async (req, res) => {
  try {
    const poolkey = await redis.randomkey();

    const poolcnt = Number(await redis.get(poolkey));
    
    if (poolcnt >= 3) {
      await redis.del(poolkey);
      //Account sharing code here
    }

    await redis.set(poolkey, poolcnt+1);
    await mongo.update(mongo.model.User, { email: req.session.email }, { poolkey });

    res.json({
      status: 'Joined',
      joinedUsers: poolcnt+1
    });
  } catch (err) {
    res.sendStatus(500)
    console.error(err);
  }
});

module.exports = router;