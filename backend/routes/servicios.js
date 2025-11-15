const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_servicio, id_emprendedor, nombre_servicio, descripcion, duracion_minutos, precio FROM servicios ORDER BY id_servicio');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener servicios' });
  }
});

router.post('/', async (req, res) => {
  const { id_emprendedor, nombre_servicio, descripcion, duracion_minutos, precio } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO servicios (id_emprendedor, nombre_servicio, descripcion, duracion_minutos, precio) VALUES (?, ?, ?, ?, ?)', [id_emprendedor, nombre_servicio, descripcion, duracion_minutos, precio]);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear servicio' });
  }
});

module.exports = router;
