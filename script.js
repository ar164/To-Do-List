const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const toggleBtn = document.getElementById("toggle-theme");

// Load saved tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
};

// Add new task
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    taskInput.value = "";
    taskInput.focus();
  }
});

function addTask(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");
  li.textContent = text;

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Theme toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
