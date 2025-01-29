const Message = require('../models/messageModel');  // Asegúrate de importar el modelo

async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // Ordenar por fecha ascendente
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
}

module.exports = { getMessages };
