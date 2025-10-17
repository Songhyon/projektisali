// --- Elementit ---
const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear-schedule');

// --- Data ---
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// --- Tallenna localStorageen ---
function saveData() {
  localStorage.setItem('workouts', JSON.stringify(workouts));
}

// --- Renderöi lista ---
function renderList() {
  list.innerHTML = '';

  if (workouts.length === 0) {
    list.innerHTML = '<li>No workouts added yet.</li>';
    return;
  }

  workouts.forEach((w, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${w.day}</strong>: ${w.workout}
      <button class="delete-btn" data-index="${i}">❌</button>
    `;
    list.appendChild(li);
  });
}

// --- Lisää uusi merkintä ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const day = document.getElementById('day').value;
  const workout = document.getElementById('workout').value.trim();

  if (!day || !workout) {
    alert('Please fill all fields.');
    return;
  }

  workouts.push({ day, workout });
  saveData();
  renderList();
  form.reset();
});

// --- Poista yksittäinen merkintä ---
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    workouts.splice(index, 1);
    saveData();
    renderList();
  }
});

// --- Tyhjennä kaikki ---
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the schedule?')) {
    workouts = [];
    saveData();
    renderList();
  }
});

// --- Käynnistyksessä ---
renderList();
