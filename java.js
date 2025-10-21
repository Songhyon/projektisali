const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear');
const workoutSelect = document.getElementById('workout');
const exerciseSelect = document.getElementById('exercise');
const weekOrder = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const exerciseOptions = {
  "Leg Day": ["Squat", "Bulgarian Split Squat", "Leg Press", "Lunges", "Deadlift"],
  "Arm Day": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl", "Overhead Extension"],
  "Back Day": ["Pull-ups", "Lat Pulldown", "Barbell Row", "Dumbbell Row", "Deadlift"],
  "Chest Day": ["Bench Press", "Incline Dumbbell Press", "Chest Fly", "Push-ups", "Cable Crossover"],
  "Cardio": ["Running", "Cycling", "Rowing", "Jump Rope", "HIIT"],
  "Rest": ["No Exercise"]
};

// Päivitä exercise-lista kun workout vaihtuu
workoutSelect.addEventListener('change', updateExercise);

function updateExercise() {
  const selectedWorkout = workoutSelect.value;
  const exercises = exerciseOptions[selectedWorkout] || [];

  exerciseSelect.replaceChildren();

  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.textContent = "--Select Exercise--";
  exerciseSelect.appendChild(defaultOption);

  exercises.forEach(ex => {
    const option = document.createElement('option');
    option.value = ex;
    option.textContent = ex;
    exerciseSelect.appendChild(option);
  });
}

// === Lomakkeen lähetys ===
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const day = document.getElementById('day').value;
  const workout = workoutSelect.value;
  const exercise = exerciseSelect.value;

  if (!day || !workout) {
    alert("Please select a day and a workout.");
    return;
  }

  let text = `${day}: ${workout}`;
  if (workout !== "Rest" && exercise) {
    text += ` - ${exercise}`;
  }

  // Luo uusi listaelementti
  const li = document.createElement('li');
  li.classList.add('schedule-item');

  // Luo checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('done-checkbox');

  // Luo tekstielementti
  const span = document.createElement('span');
  span.textContent = text;

  // Lisää molemmat listaelementtiin
  li.appendChild(checkbox);
  li.appendChild(span);

  // Aseta väri workoutin mukaan
  if (workout === "Leg Day") li.style.backgroundColor = "#a0c4ff";
  if (workout === "Arm Day") li.style.backgroundColor = "#ffadad";
  if (workout === "Chest Day") li.style.backgroundColor = "#c5512e";
  if (workout === "Back Day") li.style.backgroundColor = "#8d33d2";
  if (workout === "Cardio") li.style.backgroundColor = "#caffbf";
  if (workout === "Rest") li.style.backgroundColor = "#d3d3d3";

  // Lisää checkbox-toiminto
  checkbox.addEventListener('change', () => {
    span.classList.toggle('done', checkbox.checked);
    saveSchedule();
  });

  // Lisää listaan oikeaan kohtaan
  insertInOrder(li, day);

  saveSchedule(); // tallennetaan
  form.reset();
  updateExercise();
});

// Päivien järjestysfunktio
function insertInOrder(li, day) {
  const newIndex = weekOrder.indexOf(day);
  const items = Array.from(list.children);

  let inserted = false;
  for (let i = 0; i < items.length; i++) {
    const itemDay = items[i].querySelector('span').textContent.split(':')[0];
    const itemIndex = weekOrder.indexOf(itemDay);

    if (newIndex < itemIndex) {
      list.insertBefore(li, items[i]);
      inserted = true;
      break;
    }
  }
  if (!inserted) list.appendChild(li);
}

// Tyhjennä lista
clearBtn.addEventListener('click', () => {
  list.innerHTML = '';
  localStorage.removeItem('schedule');
});

// === TALLENNUS ===
function saveSchedule() {
  const items = Array.from(list.children).map(li => {
    const checkbox = li.querySelector('.done-checkbox');
    const span = li.querySelector('span');
    return {
      text: span.textContent,
      done: checkbox.checked,
      color: li.style.backgroundColor || ''
    };
  });
  localStorage.setItem('schedule', JSON.stringify(items));
}

// === LATAUS ===
function loadSchedule() {
  const data = JSON.parse(localStorage.getItem('schedule')) || [];
  data.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('schedule-item');
    li.style.backgroundColor = item.color || '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('done-checkbox');
    checkbox.checked = item.done;

    const span = document.createElement('span');
    span.textContent = item.text;
    if (item.done) span.classList.add('done');

    checkbox.addEventListener('change', () => {
      span.classList.toggle('done', checkbox.checked);
      saveSchedule();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
  });
}

loadSchedule(); // Lataa data sivun käynnistyessä
