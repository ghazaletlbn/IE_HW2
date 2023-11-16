document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const searchInput = document.getElementById("searchInput");
    const searchTaskButton = document.getElementById("searchTask");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");
    const remainingTasks = document.getElementById("remainingTasks");

    let tasks = [];

    // Load tasks from localStorage
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        displayTasks();
    }

    // Add a new task
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const newTask = {
                id: Date.now(),
                title: taskText,
                completed: false,
            };
            tasks.push(newTask);
            taskInput.value = "";
            updateLocalStorage();
            displayTasks();
        }
    });

    // Search for tasks
    searchTaskButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredTasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm)
        );
        displayTasks(filteredTasks);
    });

    // Display tasks
    function displayTasks(displayedTasks = tasks) {
        taskList.innerHTML = "";
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter((task) => task.completed).length;
        remainingTasks.textContent = tasks.filter((task) => !task.completed).length;

        displayedTasks.forEach((task) => {
            const taskItem = document.createElement("div");
            taskItem.className = `task-item ${task.completed ? "complete" : ""}`;
            taskItem.innerHTML = `
                <span>${task.title}</span>
                <button class="delete-button" data-id="${task.id}">Delete</button>
            `;

            taskItem.querySelector("button.delete-button").addEventListener("click", function () {
                deleteTask(task.id);
            });

            taskItem.addEventListener("click", function () {
                toggleTaskCompletion(task.id);
            });

            taskList.appendChild(taskItem);
        });
    }



   
});
