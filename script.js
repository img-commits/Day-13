const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const weekSelect = document.getElementById("weekSelect");
const categorySelect = document.getElementById("categorySelect");

let tasks = JSON.parse(localStorage.getItem("boardTasks")) || [];

function saveTasks() {
  localStorage.setItem("boardTasks", JSON.stringify(tasks));
}

function renderTasks() {
  // Clear all category containers
  document.querySelectorAll("[id*='week']").forEach(el => {
    if(el.id.includes("-")) el.innerHTML = "";
  });

  tasks.forEach((task, index) => {
    const container = document.getElementById(`${task.week}-${task.category}`);

    const div = document.createElement("div");
    div.className = "bg-gray-50 p-2 rounded-lg shadow flex justify-between items-center transition-all duration-300 ease-in-out mb-2";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
        <span class="${task.completed ? "line-through text-gray-400" : ""}">
          ${task.text}
        </span>
      </div>
      <button data-delete="${index}" class="text-red-500 hover:text-red-700">
        Delete
      </button>
    `;

    container.appendChild(div);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    week: weekSelect.value,
    category: categorySelect.value,
    completed: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", e => {
  if (e.key === "Enter") addTask();
});

document.addEventListener("click", e => {
  if (e.target.dataset.delete !== undefined) {
    tasks.splice(e.target.dataset.delete, 1);
    saveTasks();
    renderTasks();
  }

  if (e.target.type === "checkbox") {
    tasks[e.target.dataset.index].completed = e.target.checked;
    saveTasks();
    renderTasks();
  }
});

renderTasks();