document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleCompleted);

    // Create a label for the task text
    const label = document.createElement('label');
    label.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', removeTask);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(removeBtn);
    taskList.appendChild(taskItem);

    saveTask({ text: taskText, completed: false });

    taskInput.value = '';
}

function removeTask(event) {
    const taskItem = event.target.parentElement;
    const taskText = taskItem.querySelector('label').textContent;
    taskList.removeChild(taskItem);

    removeTaskFromStorage(taskText);
}

function toggleCompleted(event) {
    const checkbox = event.target;
    const taskItem = checkbox.parentElement;
    const label = taskItem.querySelector('label');

    const taskText = label.textContent;
    const isCompleted = checkbox.checked;

    taskItem.classList.toggle('completed', isCompleted);
    updateTaskStatusInStorage(taskText, isCompleted);
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatusInStorage(taskText, completed) {
    let tasks = getTasks();
    tasks = tasks.map(task => task.text === taskText ? { text: task.text, completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => {
        const taskItem = document.createElement('li');

        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', toggleCompleted);

        // Create a label for the task text
        const label = document.createElement('label');
        label.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', removeTask);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(removeBtn);
        taskList.appendChild(taskItem);
    });
}
