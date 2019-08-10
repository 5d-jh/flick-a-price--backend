const mongoose = require('mongoose');

exports.mongoose = mongoose;

exports.model = {
  User: mongoose.model(
    'user',
    new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      hasNetflixAccount: Boolean,
      poolkey: String
    })
  )
}

/**
 * @param {mongoose.Model} Model
 * @param {Object} data
 */
exports.create = async (Model, data) => {
  const model = new Model(data);
  await model.save();
}

/**
 * @param {mongoose.Model} Model
 * @param {object} conditions
 */
exports.retrieve = async (Model, conditions) => {
  return await Model.findOne(conditions);
}

/**
 * @param {mongoose.Model} Model
 * @param {object} conditions
 * @param {object} data
 */
exports.update = async (Model, conditions, data) => {
  return await Model.findOneAndUpdate(conditions, { $set: data });
}