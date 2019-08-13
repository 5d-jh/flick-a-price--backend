const router = require('express').Router();
const redis = require('./modules/db_redis');
const mongo = require('./modules/db_mongo');

router.use((req, res, next) => {
  if (!req.session.email) {
    return res.status(403).send('Session info missing');
  }
  next();
});

router.get('/list', async (_, res) => {
  const list = await redis.keys();
  res.json(list);
});

router.post('/create', async (req, res, next) => {
  try {
    const poolkey = new Date().getTime().toString(16);
    const result = await redis.set(poolkey, '1');
    await mongo.update(mongo.model.User, { email: req.session.email }, { poolkey });
    res.send(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/join', async (req, res, next) => {
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
    return next(err);
  }
});

router.get('/status', async (req, res, next) => {
  try {
    const { poolkey } = await mongo.retrieve(mongo.model.User, { email: req.session.email });
    if (poolkey) {
      const poolcnt = Number(await redis.get(poolkey));
      res.send({
        hasJoinedPool: true,
        isFull: poolcnt === 4,
          //Pool count is removed when pool is full; if poolcnt exists, pool isn't full.
        remainingVacancy: !poolcnt ? 0 : 4 - poolcnt
          //Show it if isFull is false
      });
    } else {
      res.send({
        hasJoinedPool: false
      });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;