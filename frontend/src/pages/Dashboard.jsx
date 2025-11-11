import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
export default function Dashboard(){
  const [data, setData] = useState(null)
  const canvasRef = useRef(null)
  useEffect(()=>{
    axios.get('/api/estadisticas/overview').then(r=>setData(r.data)).catch(()=>{})
  },[])
  useEffect(()=>{
    if(!data) return
    const labels = data.next7.map(x=> (new Date(x.fecha_cita)).toLocaleDateString())
    const values = data.next7.map(x=> x.total)
    const Chart = window.Chart
    if(!Chart) return
    const ctx = canvasRef.current.getContext('2d')
    new Chart(ctx, {type:'bar', data:{labels, datasets:[{label:'Citas próximas 7 días', data:values, backgroundColor:'rgba(0,123,255,0.6)'}]}})
  },[data])
  return (
    <div>
      <h2>Estadísticas</h2>
      <div className="grid">
        <div className="card small">Total citas: <strong>{data?data.total_citas:'—'}</strong></div>
        <div className="card small">Completadas: <strong>{data?data.citas_completadas:'—'}</strong></div>
        <div className="card small">Ingresos: <strong>{data?('$'+data.ingresos):'—'}</strong></div>
      </div>
      <div className="card" style={{marginTop:12}}>
        <canvas ref={canvasRef} width="600" height="250"></canvas>
      </div>
    </div>
  )
}
