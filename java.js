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

// Harjoitusvideot
const exerciseVideos = {
  // Leg Day
  "Squat": "https://www.youtube.com/embed/aclHkVaku9U",
  "Bulgarian Split Squat": "https://www.youtube.com/embed/hiLF_pF3EJM",
  "Leg Press": "https://www.youtube.com/embed/Aq5uxXrXq7c",
  "Lunges": "https://www.youtube.com/embed/fydLSJlGx-0",
  "Deadlift": "https://www.youtube.com/embed/vfKwjT5-86k",
  // Arm Day
  "Bicep Curl": "https://www.youtube.com/embed/sYV-ki-1blM",
  "Tricep Pushdown": "https://www.youtube.com/embed/2-LAMcpzODU",
  "Hammer Curl": "https://www.youtube.com/embed/zC3nLlEvin4",
  "Overhead Extension": "https://www.youtube.com/embed/8WL0m0vLAPo",
  // Back Day
  "Pull-ups": "https://www.youtube.com/embed/eGo4IYlbE5g",
  "Lat Pulldown": "https://www.youtube.com/embed/CAwf7n6Luuc",
  "Barbell Row": "https://www.youtube.com/embed/vT2GjY_Umpw",
  "Dumbbell Row": "https://www.youtube.com/embed/pYcpY20QaE8",
  // Chest Day
  "Bench Press": "https://www.youtube.com/embed/rT7DgCr-3pg",
  "Incline Dumbbell Press": "https://www.youtube.com/embed/8iPEnn-ltC8",
  "Chest Fly": "https://www.youtube.com/embed/eozdVDA78K0",
  "Push-ups": "https://www.youtube.com/embed/IODxDxX7oi4",
  "Cable Crossover": "https://www.youtube.com/embed/taI4XduLpTk",
  // Cardio
  "Running": "https://www.youtube.com/embed/8vZLh3eZ3Nw",
  "Cycling": "https://www.youtube.com/embed/8vZLh3eZ3Nw",
  "Rowing": "https://www.youtube.com/embed/8vZLh3eZ3Nw",
  "Jump Rope": "https://www.youtube.com/embed/8vZLh3eZ3Nw",
  "HIIT": "https://www.youtube.com/embed/8vZLh3eZ3Nw"
};

// Lomakkeen lähetys - lisää useita liikkeitä
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const day = document.getElementById('day').value;
  const workout = workoutSelect.value;
  const selectedExercises = Array.from(exerciseSelect.selectedOptions).map(opt => opt.value);
  const setsInput = document.getElementById('sets').value;
  const repsInput = document.getElementById('reps').value;

  if (!day || !workout) {
    alert("Please select a day and a workout.");
    return;
  }

  // Rest-päivälle lisää vain yksi "No Exercise"
  const exercisesToAdd = workout === "Rest" ? ["No Exercise"] : selectedExercises;

  if (workout !== "Rest" && exercisesToAdd.length === 0) {
    alert("Please select at least one exercise.");
    return;
  }

  exercisesToAdd.forEach(exercise => {
    let text = `${day}: ${workout}`;
    if (workout !== "Rest" && exercise) text += ` - ${exercise}`;

    const li = document.createElement('li');
    li.classList.add('schedule-item');
    li.dataset.exercise = exercise;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('done-checkbox');

    const span = document.createElement('span');
    span.textContent = text;
    if (setsInput) span.textContent += ` Sets: ${setsInput}`;
    if (repsInput) span.textContent += ` Reps: ${repsInput}`;

    li.appendChild(checkbox);
    li.appendChild(span);

    // Video click-event
    li.addEventListener('click', () => {
      const selectedExercise = li.dataset.exercise;
      const videoDiv = document.getElementById('exercise-video');

      if (exerciseVideos[selectedExercise]) {
        videoDiv.innerHTML = `
          <iframe width="560" height="315"
          src="${exerciseVideos[selectedExercise]}"
          title="${selectedExercise} Video" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        `;
      } else {
        videoDiv.innerHTML = "";
      }
    });

    // Värit
    if (workout === "Leg Day") li.style.backgroundColor = "#a0c4ff";
    if (workout === "Arm Day") li.style.backgroundColor = "#ffadad";
    if (workout === "Chest Day") li.style.backgroundColor = "#c5512e";
    if (workout === "Back Day") li.style.backgroundColor = "#8d33d2";
    if (workout === "Cardio") li.style.backgroundColor = "#caffbf";
    if (workout === "Rest") li.style.backgroundColor = "#d3d3d3";

    checkbox.addEventListener('change', () => {
      span.classList.toggle('done', checkbox.checked);
      saveSchedule();
    });

    insertInOrder(li, day);
  });

  saveSchedule();
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

// Tallennus
function saveSchedule() {
  const items = Array.from(list.children).map(li => {
    const checkbox = li.querySelector('.done-checkbox');
    const span = li.querySelector('span');

    // Erotellaan sets & reps
    let sets = "";
    let reps = "";
    const setsMatch = span.textContent.match(/Sets: (\d+)/);
    const repsMatch = span.textContent.match(/Reps: (\d+)/);
    if (setsMatch) sets = setsMatch[1];
    if (repsMatch) reps = repsMatch[1];

    return {
      text: span.textContent.split(' Sets:')[0].split(' Reps:')[0],
      exercise: li.dataset.exercise,
      done: checkbox.checked,
      color: li.style.backgroundColor || '',
      sets: sets,
      reps: reps
    };
  });
  localStorage.setItem('schedule', JSON.stringify(items));
}

// Lataus
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
    if (item.sets) span.textContent += ` Sets: ${item.sets}`;
    if (item.reps) span.textContent += ` Reps: ${item.reps}`;
    if (item.done) span.classList.add('done');

    li.dataset.exercise = item.exercise || "";

    li.addEventListener('click', () => {
      const selectedExercise = li.dataset.exercise;
      const videoDiv = document.getElementById('exercise-video');

      if (exerciseVideos[selectedExercise]) {
        videoDiv.innerHTML = `
          <iframe width="560" height="315"
          src="${exerciseVideos[selectedExercise]}"
          title="${selectedExercise} Video" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        `;
      } else {
        videoDiv.innerHTML = "";
      }
    });

    checkbox.addEventListener('change', () => {
      span.classList.toggle('done', checkbox.checked);
      saveSchedule();
    });

    li.appendChild(checkbox);
    li.appendChild(span);

    const dayName = item.text.split(':')[0];
    insertInOrder(li, dayName);
  });
}

loadSchedule();
