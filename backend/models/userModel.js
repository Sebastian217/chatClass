const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['estudiante', 'moderador'], default: 'estudiante' }
});

module.exports = mongoose.model('User', userSchema);
