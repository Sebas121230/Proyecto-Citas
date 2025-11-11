Proyecto ReservaLocal - MySQL (XAMPP) entrega completa
-----------------------------------------------------

Contenido del ZIP:
- backend/   (Express API + MySQL connection)
- frontend/  (React + Vite app)
- database_mysql.sql  (script para phpMyAdmin / XAMPP)
- README.txt

Instrucciones rápidas (XAMPP / phpMyAdmin):
1. Inicia XAMPP y asegúrate de que Apache y MySQL estén corriendo.
2. Abre phpMyAdmin (http://localhost/phpmyadmin) y ejecuta el script 'database_mysql.sql' para crear la base de datos y datos de prueba.
3. Ajusta credenciales si es necesario en backend/.env (por defecto de XAMPP: user=root, password='').

Ejecutar la app:
1) Frontend (build)
   cd frontend
   npm install
   npm run build

2) Backend
   cd backend
   npm install
   npm start

3) Abre en el navegador: http://localhost:3000

Notas:
- Reemplaza el WIDGET_ID de Jivo en frontend/index.html por tu id real.
- Endpoints disponibles:
  GET /api/usuarios
  GET /api/servicios
  POST /api/servicios
  GET /api/citas
  POST /api/citas
  POST /api/mensajes
  GET /api/estadisticas/overview
