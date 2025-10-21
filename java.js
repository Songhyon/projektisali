const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear'); // vastaa HTML:n ID:tä
const workoutSelect = document.getElementById('workout');
const exerciseSelect = document.getElementById('exercise');

const exerciseOptions = {
  "Leg Day": ["Squat", "Bulgarian Split Squat", "Leg Press", "Lunges", "Deadlift"],
  "Arm Day": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl", "Overhead Extension"],
  "Cardio": ["Running", "Cycling", "Rowing", "Jump Rope", "HIIT"],
  "Rest": ["No Exercise"]
};

// Päivitä exercise-select kun valitaan treeni
workoutSelect.addEventListener('change', updateExercise);

function updateExercise() {
  const selectedWorkout = workoutSelect.value;
  const exercises = exerciseOptions[selectedWorkout] || [];

  // Tyhjennä vanhat vaihtoehdot
  exerciseSelect.replaceChildren();

  // Lisää oletusvaihtoehto
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.textContent = "--Select Exercise--";
  exerciseSelect.appendChild(defaultOption);

  // Lisää uudet liikkeet
  exercises.forEach(ex => {
    const option = document.createElement('option');
    option.value = ex;
    option.textContent = ex;
    exerciseSelect.appendChild(option);
  });
}

// Lomakkeen lähetys
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

  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);

  form.reset();
  updateExercise(); // palauttaa exercise-selectin oletukseen
});

// Tyhjennä lista
clearBtn.addEventListener('click', () => {
  list.innerHTML = '';
});
