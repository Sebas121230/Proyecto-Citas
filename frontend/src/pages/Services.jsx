import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Services(){
  const [services, setServices] = useState([])
  useEffect(()=>{
    axios.get('/api/servicios').then(r=>setServices(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2>Servicios</h2>
      <div className="grid">
        {services.map(s=> (
          <div className="card service" key={s.id_servicio}>
            <img src="/public/service-placeholder.png" alt="" className="service-img"/>
            <h3>{s.nombre_servicio}</h3>
            <p>{s.descripcion}</p>
            <p><strong>{s.duracion_minutos} min</strong> • ${s.precio}</p>
          </div>
        ))}
        {services.length===0 && <p>No hay servicios disponibles.</p>}
      </div>
    </div>
  )
}
