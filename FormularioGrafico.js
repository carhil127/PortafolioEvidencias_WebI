let puntuaciones = [];

function evaluar() {
  const form = document.getElementById('quizForm');
  let score = 0;
  puntuaciones = [];

  for (let i = 1; i <= 6; i++) {
    const respuesta = form[`q${i}`].value;
    if (respuesta === 'correct') {
      score++;
      puntuaciones.push(1);
    } else {
      puntuaciones.push(0);
    }
  }

  document.getElementById('resultado').innerText = `Tu puntuación: ${score}/3`;

  generarGrafico();
}

function generarGrafico() {
  const ctx = document.getElementById('grafico').getContext('2d');
  if (window.miGrafico) window.miGrafico.destroy();

  window.miGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5', 'Pregunta 6'],
      datasets: [{
        label: 'Puntos por Pregunta',
        data: puntuaciones,
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 1 }
      }
    }
  });
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Resultado del Diagnóstico de JavaScript", 10, 10);
  doc.text(`Puntuación total: ${puntuaciones.reduce((a, b) => a + b, 0)}/6`, 10, 20);

  // Convertir el gráfico a imagen y añadir al PDF
  const canvas = document.getElementById('grafico');
  const imgData = canvas.toDataURL('image/png');

  doc.addImage(imgData, 'PNG', 10, 30, 180, 100);
  doc.save("diagnostico_js.pdf");
}
