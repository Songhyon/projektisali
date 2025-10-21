const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear-schedule');
const workoutSelect = document.getElementById('workout');
const exerciseSelect = document.getElementById('exercise');
const setField = document.getElementById('set');
const repField = document.getElementById('rep');
const setRepFields = document.getElementById('set-rep-fields');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Estää sivun uudelleenlatauksen

  const day = document.getElementById('day').value;
  const workout = workoutSelect.value.trim();
  const exercise = exerciseSelect.value.trim();
  const sets = setField.value;
  const reps = repField.value;

  if (!day || !workout) {
    alert('Please select a day and a workout.');
    return;
  }

  // Jos valittu treeni ei ole "Rest", lisätään setit ja repsit
  let text = `${day}: ${workout}`;
  if (workout !== 'Rest') {
    if (exercise) text += ` - ${exercise}`;
    text += ` (${sets} sets x ${reps} reps)`;
  }

  // Luodaan uusi listaelementti
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);

  // Tyhjennetään kentät
  form.reset();
});

// Tyhjennä koko lista
clearBtn.addEventListener('click', () => {
  list.innerHTML = '';
});
