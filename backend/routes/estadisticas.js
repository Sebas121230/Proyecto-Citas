const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/overview', async (req, res) => {
  try {
    const [[total]] = await pool.query('SELECT COUNT(*) AS total_citas FROM citas');
    const [[completed]] = await pool.query("SELECT COUNT(*) AS citas_completadas FROM citas WHERE estado='completada'"); 
    const [[income]] = await pool.query('SELECT IFNULL(SUM(s.precio),0) AS ingresos FROM citas c JOIN servicios s ON c.id_servicio=s.id_servicio WHERE c.estado=\'completada\'');
    const [next7] = await pool.query("SELECT fecha_cita, COUNT(*) AS total FROM citas WHERE fecha_cita >= CURDATE() AND fecha_cita < DATE_ADD(CURDATE(), INTERVAL 7 DAY) GROUP BY fecha_cita ORDER BY fecha_cita");
    res.json({
      total_citas: total.total_citas,
      citas_completadas: completed.citas_completadas,
      ingresos: income.ingresos,
      next7: next7
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener estadisticas' });
  }
});

module.exports = router;
