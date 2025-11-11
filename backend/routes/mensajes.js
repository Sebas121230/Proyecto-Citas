const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.post('/', async (req, res) => {
  const { id_remitente, id_destinatario, mensaje } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Mensajes (id_remitente, id_destinatario, mensaje) VALUES (?, ?, ?)', [id_remitente, id_destinatario, mensaje]);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
});

module.exports = router;
