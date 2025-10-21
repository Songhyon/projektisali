const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear-schedule');
const workoutSelect = document.getElementById('workout');
const exerciseSelect = document.getElementById('exercise');
const setField = document.getElementById('set');
const repField = document.getElementById('rep');
const setRepFields = document.getElementById('set-rep-fields');

// Kun lomake lähetetään (Add to Schedule painetaan)
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Estää sivun uudelleenlatauksen

  const day = document.getElementById('day').value;
  const workout = workoutSelect.value;
  const exercise = exerciseSelect.value;
  const sets = setField.value;
  const reps = repField.value;

  if (!day || !workout) {
    alert('Please select a day and a workout.');
    return;
  }

  // Jos valitaan "Rest", ei tarvita set/reps
  let text = `${day}: ${workout}`;
  if (workout !== 'Rest' && sets && reps) {
    text += exercise ? ` - ${exercise} (${sets} sets x ${reps} reps)` : ` (${sets} sets x ${reps} reps)`;
  }

  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);

  // Tyhjennetään lomake seuraavaa syöttöä varten
  form.reset();
});

// Tyhjennä lista kokonaan
clearBtn.addEventListener('click', () => {
  list.innerHTML = '';
});
