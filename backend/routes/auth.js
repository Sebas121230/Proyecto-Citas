const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

const SECRET = process.env.JWT_SECRET || 'clave-super-secreta';

// 🔹 Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contrasena, tipo_usuario, telefono } = req.body;
    if (!nombre || !correo || !contrasena)
      return res.status(400).json({ message: 'Faltan datos obligatorios' });

    const [exist] = await pool.query('SELECT id_usuario FROM usuarios WHERE correo = ?', [correo]);
    if (exist.length > 0)
      return res.status(400).json({ message: 'El correo ya está registrado' });

    // Cifrar contraseña
    const hashed = await bcrypt.hash(contrasena, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, tipo_usuario, telefono) VALUES (?,?,?,?,?)',
      [nombre, correo, hashed, tipo_usuario || 'cliente', telefono || null]
    );

    res.json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ message: 'Error en el registro' });
  }
});

// 🔹 Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const [users] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (users.length === 0)
      return res.status(401).json({ message: 'Usuario no encontrado' });

    const user = users[0];
    const match = await bcrypt.compare(contrasena, user.contrasena);

    if (!match)
      return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id_usuario, nombre: user.nombre, tipo: user.tipo_usuario },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        tipo_usuario: user.tipo_usuario,
        correo: user.correo,
        telefono: user.telefono,
      },
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el login' });
  }
});

module.exports = router;