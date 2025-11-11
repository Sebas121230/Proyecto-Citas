const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT c.id_cita, c.id_cliente, c.id_servicio, c.fecha_cita, c.hora_cita, c.estado, c.notas,
      s.nombre_servicio, u.nombre AS cliente_nombre, u2.nombre AS emprendedor_nombre
      FROM Citas c
      LEFT JOIN Servicios s ON c.id_servicio = s.id_servicio
      LEFT JOIN Usuarios u ON c.id_cliente = u.id_usuario
      LEFT JOIN Usuarios u2 ON s.id_emprendedor = u2.id_usuario
      ORDER BY c.fecha_cita, c.hora_cita`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al listar citas' });
  }
});

router.post('/', async (req, res) => {
  const { id_cliente, id_servicio, fecha_cita, hora_cita, notas } = req.body;
  try {
    const [chk] = await pool.query('SELECT COUNT(*) AS cnt FROM Citas WHERE id_servicio=? AND fecha_cita=? AND hora_cita=? AND estado IN ("pendiente","confirmada")', [id_servicio, fecha_cita, hora_cita]);
    if (chk[0].cnt > 0) return res.status(409).json({ message: 'Horario no disponible' });
    const [result] = await pool.query('INSERT INTO Citas (id_cliente, id_servicio, fecha_cita, hora_cita, estado, notas) VALUES (?, ?, ?, ?, ?, ?)', [id_cliente, id_servicio, fecha_cita, hora_cita, 'pendiente', notas]);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear cita' });
  }
});

module.exports = router;
