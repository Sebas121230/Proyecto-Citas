const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Rutas API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/citas', require('./routes/citas'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/api/estadisticas', require('./routes/estadisticas'));
app.use('/api/auth', require('./routes/auth'));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://code.jivosite.com https://telemetry.jivosite.com;",
      "connect-src 'self' https://code.jivosite.com https://telemetry.jivosite.com wss://*.jivosite.com https://*.jivosite.com;",
      "style-src 'self' 'unsafe-inline' https://code.jivosite.com https://*.jivosite.com http://code.jivosite.com/css/a445eff/widget.css;",
      "img-src 'self' data: https://code.jivosite.com https://*.jivosite.com;",
      "frame-src https://code.jivosite.com https://*.jivosite.com;"
    ].join(" ")
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
