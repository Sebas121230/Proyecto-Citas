import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { nombre, correo, contrasena, tipo_usuario: 'cliente', telefono });
      setMsg('✅ Registro exitoso, ya puedes iniciar sesión.');
    } catch {
      setMsg('❌ Error en el registro, verifica los datos.');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '80px auto' }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} required />
        <label>Correo</label>
        <input value={correo} onChange={e => setCorreo(e.target.value)} type="email" required />
        <label>Contraseña</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="btn" style={{ width: '100%' }}>Registrarse</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p style={{ textAlign: 'center', marginTop: 10 }}>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
}