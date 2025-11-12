import React, { useEffect, useState } from "react";
import { CalendarDays, Search } from "lucide-react";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/citas")
      .then((res) => res.json())
      .then((data) => {
        setCitas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const citasFiltradas = citas.filter((c) =>
    `${c.cliente_nombre} ${c.nombre_servicio}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Gestión de Citas
            </h1>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-t-blue-600 rounded-full mr-2"></div>
            Cargando citas...
          </div>
        ) : citasFiltradas.length === 0 ? (
          <p className="text-center text-gray-500">No hay citas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left text-sm uppercase">
                  <th className="py-9 px-15">#</th>
                  <th className="py-9 px-15">Usuario</th>
                  <th className="py-9 px-15">Servicio</th>
                  <th className="py-9 px-15">Fecha</th>
                  <th className="py-9 px-15">Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {citasFiltradas.map((cita, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="py-9 px-15">{cita.id_cita}</td>
                    <td className="py-9 px-15 font-medium text-gray-700">
                      {cita.cliente_nombre}
                    </td>
                    <td className="py-9 px-15">{cita.nombre_servicio}</td>
                    <td className="py-9 px-15">
                      {new Date(cita.fecha_cita).toLocaleDateString("es-CO")}
                    </td>
                    <td className="py-9 px-15">{cita.hora_cita}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Citas;