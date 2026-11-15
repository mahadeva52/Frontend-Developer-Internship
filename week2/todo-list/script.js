
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Add Task
function addTask() {

    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    // Mark completed
    span.addEventListener("click", function () {
        span.classList.toggle("completed");
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCount();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    input.value = "";

    updateCount();
}

// Update task count
function updateCount() {
    const total = taskList.children.length;
    taskCount.textContent = "Total Tasks: " + total;
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
