const redis = require('redis');

const client = redis.createClient('redis://redis_server:6379');

exports.keys = () => (
  new Promise((resolve, reject) => {
    client.keys('*', (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    })
  })
)

/**
 * @param {string} key
 */
exports.get = (key) => (
  new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  })
);

/**
 * @param {string} key
 * @param {string} value
 */
exports.set = (key, value) => (
  new Promise((resolve, reject) => {
    client.set(key, value, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  })
);

exports.randomkey = () => (
  new Promise((resolve, reject) => {
    client.randomkey((err, reply) => {
      if (err) reject(err);
      resolve(reply);
    })
  })
);

/**
 * @param {string} key
 */
exports.del = (key) => (
  new Promise((resolve, reject) => {
    client.del(key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    })
  })
)