import React from 'react'
export default function Home(){
  return (
    <section className="hero card">
      <div className="hero-left">
        <h2>ReservaLocal</h2>
        <p>Organiza tu agenda, recibe clientes y gestiona tu negocio desde una sola plataforma.</p>
        <div className="features">
          <div className="feature"><img src="/ic-1.svg" alt=""/><p>Reservas rápidas</p></div>
          <div className="feature"><img src="/ic-2.svg" alt=""/><p>Dashboard con métricas</p></div>
          <div className="feature"><img src="/ic-3.svg" alt=""/><p>Chat integrado</p></div>
        </div>
      </div>
      <div className="hero-right">
        <img src="/hero-plant.svg" alt="hero"/>
      </div>
    </section>
  )
}
