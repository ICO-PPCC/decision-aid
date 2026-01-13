// Chart rendering logic using D3.js

function initCharts() {
    console.log("initCharts invocado.");
    
    // Check if D3 is loaded
    if (typeof d3 === 'undefined') {
        console.error("D3.js no se ha cargado correctamente.");
        document.getElementById('isotype-chart').innerHTML = "<p style='color:red'>Error: D3.js no cargado.</p>";
        return;
    }

    const container = document.getElementById('isotype-chart');
    if (!container) {
        console.error("Contenedor isotype-chart no encontrado");
        return;
    }

    // Prevent re-rendering
    if (container.querySelector('svg')) {
        console.log("Gráficos ya renderizados.");
        return;
    }
    
    console.log("Inicializando gráficos D3 (Forzado)...");
    try {
        renderIsotype();
        renderGauge();
    } catch (e) {
        console.error("Error renderizando gráficos:", e);
        container.innerHTML = "<p>Error visualizando datos.</p>";
    }
}

function renderIsotype() {
    const container = document.getElementById('isotype-chart');
    if(!container) return;

    // Clear previous content/loaders
    container.innerHTML = "";

    // Data simulation
    const data = [
        { category: "Alto Riesgo", count: 15, color: "#f56565" },
        { category: "Riesgo Medio", count: 35, color: "#ed8936" },
        { category: "Bajo Riesgo", count: 50, color: "#48bb78" }
    ];

    const width = container.offsetWidth || 640; // Fallback width
    const height = 280; 
    const iconSize = 24;
    const iconsPerRow = Math.floor(width / (iconSize + 4)); 
    
    const personPath = "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("max-width", "100%")
        .style("height", "auto");

    const flatData = data.flatMap(d => Array(d.count).fill(d.color));

    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Distribución de Riesgo (100 pacientes simulados)")
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("fill", "#2d3748");

    // Icons
    svg.append("g")
        .selectAll("path")
        .data(flatData)
        .join("path")
        .attr("d", personPath)
        .attr("transform", (d, i) => {
            const x = (i % iconsPerRow) * (iconSize + 4) + (width - (iconsPerRow * (iconSize + 4))) / 2;
            const y = Math.floor(i / iconsPerRow) * (iconSize + 8) + 60;
            return `translate(${x}, ${y}) scale(1)`;
        })
        .attr("fill", d => d)
        .style("opacity", 1); // Opacity 1 immediately to debug

    container.append(svg.node());
    console.log("Isotype renderizado con éxito.");
}

function renderGauge() {
    const container = document.getElementById('gauge-chart');
    if(!container) return;

    // Placeholder for the meeting demo - to be fully implemented based on prototype later
    container.innerHTML = `
        <div style="
            padding: 2rem; 
            background: linear-gradient(to right, #f0fff4, #ebf8ff); 
            border: 1px solid #cbd5e0; 
            border-radius: 8px; 
            text-align: center; 
            color: #2c5282;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        ">
            <h3 style="margin-bottom: 10px;">Velocímetro de Opinión</h3>
            <p>Visualización interactiva en desarrollo...</p>
            <div style="margin-top: 15px; height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
                <div style="width: 75%; height: 100%; background: #48bb78;"></div>
            </div>
            <p style="margin-top: 5px; font-size: 0.8rem; color: #718096;">75% A favor del cribado</p>
        </div>
    `;
}
