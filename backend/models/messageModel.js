// models/messageModel.js

const mongoose = require('mongoose');

// Define el esquema de los mensajes
const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  role: String,
  timestamp: { type: Date, default: Date.now }
});

// Verifica si el modelo 'Message' ya está definido antes de crearlo
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Message;
