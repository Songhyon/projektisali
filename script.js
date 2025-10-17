const form = document.getElementById('workoutForm');
const list = document.getElementById('entryList');
const summaryDiv = document.getElementById('summary');
const summaryText = document.getElementById('summaryText');
const errorDiv = document.getElementById('error');
const progressBar = document.getElementById('progressBar');
const chartCanvas = document.getElementById('chart');
const goalInput = document.getElementById('goal');
const setGoalBtn = document.getElementById('setGoal');
const toggleSummary = document.getElementById('toggleSummary');

let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
let goal = localStorage.getItem('goal') ? parseFloat(localStorage.getItem('goal')) : 0;
let chart;

function saveData() {
  localStorage.setItem('workouts', JSON.stringify(workouts));
}

function renderList() {
  list.innerHTML = '';
  workouts.forEach((w, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${w.day}</strong> — ${w.category}: ${w.hours} h (${w.description || "ei kuvausta"})</span>
      <button onclick="deleteEntry(${i})">🗑️</button>
    `;
    list.appendChild(li);
  });
  renderSummary();
    renderChart();

}
function renderSummary() {
  const totalHours = workouts.reduce((sum, w) => sum + w.hours, 0);
  summaryText.textContent = `Yhteensä: ${totalHours.toFixed(2)} h`;
    if (goal > 0) {
    const progress = Math.min((totalHours / goal) * 100, 100);
    progressBar.style.width = progress + '%';
    progressBar.textContent = `${progress.toFixed(2)}% of ${goal} h goal`;
  }
}
function renderChart() {
  const ctx = chartCanvas.getContext('2d');
  const categories = [...new Set(workouts.map(w => w.category))];
  const data = categories.map(cat => {
    return workouts
      .filter(w => w.category === cat)
      .reduce((sum, w) => sum + w.hours, 0);
  });
    if (chart) {
    chart.destroy();
  }
    chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
        datasets: [{
        label: 'Tunnit per kategoria',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]    
    },
    options: {
      responsive: true,
        scales: {  
        y: {
          beginAtZero: true,
        }
        }
    }
  });
}
