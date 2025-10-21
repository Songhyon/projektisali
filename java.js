const form = document.getElementById('workout-form');
const list = document.getElementById('schedule-list');
const clearBtn = document.getElementById('clear'); // vastaa HTML:n ID:tä
const workoutSelect = document.getElementById('workout');
const exerciseSelect = document.getElementById('exercise');

const exerciseOptions = {
  "Leg Day": ["Squat", "Bulgarian Split Squat", "Leg Press", "Lunges", "Deadlift"],
  "Arm Day": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl", "Overhead Extension"],
  "Back Day": ["Pull-ups", "Lat Pulldown", "Barbell Row", "Dumbbell Row", "Deadlift"],
  "Chest Day": ["Bench Press", "Incline Dumbbell Press", "Chest Fly", "Push-ups", "Cable Crossover"],
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
  li.classList.add('schedule-item');

if (workout === "Leg Day") li.style.backgroundColor = "#a0c4ff";
if (workout === "Arm Day") li.style.backgroundColor = "#ffadad";
if (workout === "Chest Day") li.style.backgroundColor = "#c5512eff";
if (workout === "Back Day") li.style.backgroundColor = "#8d33d2ff";
if (workout === "Cardio") li.style.backgroundColor = "#caffbf";
if (workout === "Rest") li.style.backgroundColor = "#d3d3d3";

  form.reset();
  updateExercise(); // palauttaa exercise-selectin oletukseen
});

// Tyhjennä lista
clearBtn.addEventListener('click', () => {
  list.innerHTML = '';
});

