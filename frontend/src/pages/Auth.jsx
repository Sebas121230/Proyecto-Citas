import React, { useState } from 'react'
import axios from 'axios'

export default function Auth({ onLogin }) {
  const [modo, setModo] = useState('login') // 'login' o 'register'
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: ''
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (modo === 'login') {
        const res = await axios.post('/api/auth/login', {
          correo: form.correo,
          contrasena: form.contrasena
        })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
        onLogin(res.data.usuario)
      } else {
        await axios.post('/api/auth/register', {
          nombre: form.nombre,
          correo: form.correo,
          contrasena: form.contrasena,
          telefono: form.telefono,
          tipo_usuario: 'cliente'
        })
        alert('Registro exitoso. Ahora inicia sesión.')
        setModo('login')
      }
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Error de autenticación')
    }
  }

  return (
    <div className="auth-container">
      <h2>{modo === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {modo === 'register' && (
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        {modo === 'register' && (
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
          />
        )}
        <button type="submit">
          {modo === 'login' ? 'Entrar' : 'Registrarse'}
        </button>
      </form>

      <p className="auth-toggle">
        {modo === 'login'
          ? <>¿No tienes cuenta? <button onClick={() => setModo('register')}>Regístrate aquí</button></>
          : <>¿Ya tienes cuenta? <button onClick={() => setModo('login')}>Inicia sesión</button></>
        }
      </p>
    </div>
  )
}