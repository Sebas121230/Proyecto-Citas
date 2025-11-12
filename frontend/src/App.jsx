import React, { useState } from 'react'
import Tabs from './components/Tabs'
import Home from './pages/Home'
import Services from './pages/Services'
import Book from './pages/Book'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Dates from './pages/Dates'
import Auth from './pages/Auth'
import './styles.css'

export default function App() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario')) || null
  )
  const [active, setActive] = useState('home')

  const tabs = [
    { id: 'home', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'book', label: 'Agendar' },
    { id: 'dash', label: 'Estadísticas' },
    { id: 'chat', label: 'Chat' },
    { id: 'dates', label: 'Citas' }
  ]

  if (!usuario) {
    return <Auth onLogin={setUsuario} />
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <h1>ReservaLocal</h1>
          <p className="subtitle">Citas para emprendedores</p>
        </div>
        <div className="user-info">
          <span>{usuario.nombre}</span>
          <button onClick={() => {
            localStorage.clear()
            setUsuario(null)
          }}>Cerrar sesión</button>
        </div>
      </header>

      <Tabs tabs={tabs} active={active} onChange={setActive} />

      <main className="app-main">
        {active === 'home' && <Home />}
        {active === 'services' && <Services />}
        {active === 'book' && <Book />}
        {active === 'dash' && <Dashboard />}
        {active === 'chat' && <Chat />}
        {active === 'dates' && <Dates />}
      </main>

      <footer className="app-footer">© 2025 ReservaLocal</footer>
    </div>
  )
}