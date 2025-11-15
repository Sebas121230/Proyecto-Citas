const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_usuario, nombre, correo, tipo_usuario, telefono, fecha_registro FROM usuarios ORDER BY id_usuario');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

module.exports = router;
