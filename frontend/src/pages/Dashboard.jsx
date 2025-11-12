import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/estadisticas/overview")
      .then((r) => setData(r.data))
      .catch((err) => console.error("Error al cargar estadísticas:", err));
  }, []);

  useEffect(() => {
    if (!data) return;
    const Chart = window.Chart;
    if (!Chart) return;

    // 🔄 Eliminar gráficos anteriores para evitar superposición
    if (barChartRef.current) barChartRef.current.destroy();
    if (pieChartRef.current) pieChartRef.current.destroy();

    // === 📊 Gráfico de barras (Citas próximas 7 días) ===
    const labels = data.next7.map((x) =>
      new Date(x.fecha_cita).toLocaleDateString()
    );
    const values = data.next7.map((x) => x.total);

    const barCtx = barRef.current.getContext("2d");
    barChartRef.current = new Chart(barCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Citas próximas 7 días",
            data: values,
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Citas por día (Próximos 7 días)",
            color: "#1E293B",
          },
        },
        scales: {
          x: { ticks: { color: "#64748B" } },
          y: { ticks: { color: "#64748B" } },
        },
      },
    });

    // === 🟢 Gráfico de pastel (Citas completadas vs pendientes) ===
    const completadas = data.citas_completadas;
    const pendientes = data.total_citas - completadas;

    const pieCtx = pieRef.current.getContext("2d");
    pieChartRef.current = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Completadas", "Pendientes"],
        datasets: [
          {
            data: [completadas, pendientes],
            backgroundColor: [
              getComputedStyle(document.documentElement).getPropertyValue(
                "--prim"
              ),
              getComputedStyle(document.documentElement).getPropertyValue(
                "--sec"
              ),
            ],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Estado general de las citas",
            color: "#1E293B",
          },
          legend: {
            position: "bottom",
            labels: { color: "#64748B", font: { size: 14 } },
          },
        },
      },
    });
  }, [data]);

  return (
    <div>
      <h2>📈 Estadísticas</h2>
      <div className="grid">
        <div className="card small">
          Total citas: <strong>{data ? data.total_citas : "—"}</strong>
        </div>
        <div className="card small">
          Completadas: <strong>{data ? data.citas_completadas : "—"}</strong>
        </div>
        <div className="card small">
          Ingresos: <strong>{data ? "$" + data.ingresos : "—"}</strong>
        </div>
      </div>

      <div
        className="grid"
        style={{
          marginTop: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        <div className="card">
          <canvas ref={barRef} height="250"></canvas>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <canvas ref={pieRef} height="250"></canvas>
        </div>
      </div>
    </div>
  );
}
