// Backend: Node.js + Express + MongoDB + Socket.io

// 1. Configuración del servidor
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado')).catch(err => console.error(err));

// Modelos
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['estudiante', 'moderador'], default: 'estudiante' }
}));

const Message = mongoose.model('Message', new mongoose.Schema({
  user: String,
  text: String,
  role: String,
  timestamp: { type: Date, default: Date.now }
}));

// 2. Autenticación
app.post('/register', async (req, res) => {
  const { name, username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, username, password: hashedPassword, role });
    await user.save();
    res.json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { name: user.name, username: user.username, role: user.role } });
});

// 3. Chat en tiempo real con Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado');
  socket.on('sendMessage', async ({ user, text, role }) => {
    const message = new Message({ user, text, role });
    await message.save();
    io.emit('receiveMessage', message);
  });
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// 4. Streaming
app.get('/class', (req, res) => {
  res.json({ videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }); // Video de prueba
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
