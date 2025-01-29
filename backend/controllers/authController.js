const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function register(req, res) {
  const { name, username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, username, password: hashedPassword, role });
    await user.save();
    res.json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { name: user.name, username: user.username, role: user.role } });
}

module.exports = { register, login };
