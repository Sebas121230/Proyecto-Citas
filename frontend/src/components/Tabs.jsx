import React from 'react'
export default function Tabs({tabs, active, onChange}){
  return (
    <nav className="tabs">
      {tabs.map(t=> <button key={t.id} className={t.id===active?'tab active':'tab'} onClick={()=>onChange(t.id)}>{t.label}</button>)}
    </nav>
  )
}
