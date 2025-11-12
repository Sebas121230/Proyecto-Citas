import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { correo, contrasena });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      setMsg('✅ Login exitoso');
      if (onLogin) onLogin(res.data.usuario);
    } catch (err) {
      setMsg('❌ Credenciales inválidas');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '80px auto' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo</label>
        <input value={correo} onChange={e => setCorreo(e.target.value)} type="email" required />
        <label>Contraseña</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="btn" style={{ width: '100%' }}>Ingresar</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p style={{ textAlign: 'center', marginTop: 10 }}>
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </div>
  );
}