const { app, server, io } = require('./config/server');
require('./config/db'); // Conexión a la base de datos
require('./config/dotenv'); // Cargar variables de entorno

// Rutas
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const classRoutes = require('./routes/classRoutes');

const Message = require('./models/messageModel');  // Ruta al archivo messageModel.js

app.use('/api', authRoutes);
app.use('/api', messageRoutes);
app.use('/api', classRoutes);

io.on('connection', async (socket) => {
  console.log('Usuario conectado');
  const messages = await Message.find().sort({ timestamp: 1 });
  socket.emit('loadMessages', messages);

  socket.on('sendMessage', async ({ user, text, role }) => {
    const message = new Message({ user, text, role });
    await message.save();
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
