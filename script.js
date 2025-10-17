// --- Elementit ---
const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear-schedule');

const workoutSelect = document.getElementById('workout');
const exerciseSelect = document.getElementById('exercise');
const setField = document.getElementById('set');
const repField = document.getElementById('rep');
const setRepFields = document.getElementById('set-rep-fields');

// --- Data ---
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// --- Harjoitusvaihtoehdot ---
const exerciseOptions = {
  "Leg Day": ["Squat", "Bulgarian Split Squat", "Leg Press", "Lunges", "Deadlift"],
  "Arm Day": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl", "Overhead Extension"],
  "Cardio": ["Running", "Cycling", "Rowing", "Jump Rope", "HIIT"],
  "Rest": ["No Exercise"]
};

// --- Päivitä harjoitusvaihtoehdot ---
workoutSelect.addEventListener('change', () => {
  const selectedWorkout = workoutSelect.value;
  const exercises = exerciseOptions[selectedWorkout] || [];

  // Päivitä exercise-valikko
  exerciseSelect.innerHTML = '<option value="">--Select Exercise--</option>';
  exercises.forEach(ex => {
    const option = document.createElement('option');
    option.value = ex;
    option.textContent = ex;
    exerciseSelect.appendChild(option);
  });

  // Jos valittuna on "Rest", piilota ja poista required säännöt
  if (selectedWorkout === "Rest") {
    setRepFields.style.display = "none";
    setField.required = false;
    repField.required = false;
  } else {
    setRepFields.style.display = "block";
    setField.required = true;
    repField.required = true;
  }
});

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
    const details = w.workout === "Rest"
      ? `<strong>${w.day}</strong>: Rest Day`
      : `<strong>${w.day}</strong>: ${w.workout} - ${w.exercise || ''} (${w.sets} sets x ${w.reps} reps)`;

    const li = document.createElement('li');
    li.innerHTML = `
      ${details}
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
  const exercise = document.getElementById('exercise').value.trim();
  const sets = setField.value;
  const reps = repField.value;

  if (!day || !workout) {
    alert('Please fill all required fields.');
    return;
  }

  // Jos Rest, ohita sets/reps
  const newWorkout =
    workout === "Rest"
      ? { day, workout }
      : { day, workout, exercise, sets, reps };

  workouts.push(newWorkout);
  saveData();
  renderList();
  form.reset();

  // Reset set/rep visibility
  setRepFields.style.display = "block";
  setField.required = true;
  repField.required = true;
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
