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



   
});
