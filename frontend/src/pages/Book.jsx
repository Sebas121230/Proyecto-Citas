import React, { useState } from 'react'
import axios from 'axios'
export default function Book(){
  const [form, setForm] = useState({id_cliente:'', id_servicio:'', fecha_cita:'', hora_cita:'', notas:''})
  const [msg, setMsg] = useState('')
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('/api/citas', form)
      setMsg('Reservado id: '+res.data.id)
    }catch(err){ setMsg(err.response?.data?.message || 'Error') }
  }
  return (
    <div>
      <h2>Agendar Cita</h2>
      <form className="card form" onSubmit={submit}>
        <label>Id cliente<input value={form.id_cliente} onChange={e=>setForm({...form,id_cliente:e.target.value})} required/></label>
        <label>Id servicio<input value={form.id_servicio} onChange={e=>setForm({...form,id_servicio:e.target.value})} required/></label>
        <label>Fecha (YYYY-MM-DD)<input value={form.fecha_cita} onChange={e=>setForm({...form,fecha_cita:e.target.value})} required/></label>
        <label>Hora (HH:MM)<input value={form.hora_cita} onChange={e=>setForm({...form,hora_cita:e.target.value})} required/></label>
        <label>Notas<input value={form.notas} onChange={e=>setForm({...form,notas:e.target.value})}/></label>
        <button className="btn">Reservar</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  )
}
