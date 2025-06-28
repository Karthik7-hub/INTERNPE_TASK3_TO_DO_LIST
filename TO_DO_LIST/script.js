const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const quoteBox = document.getElementById('quote');

const quotes = [
    "Keep going, you're doing great!",
    "Small steps every day 💪",
    "Believe in yourself!",
    "Progress is progress, no matter how small.",
    "Today is your day to shine 🌞",
];

// Load from localStorage
window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task.text, task.completed));
};

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        renderTask(taskText);
        saveTask(taskText, false);
        taskInput.value = '';
        showQuote();
    }
});

function renderTask(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        updateLocalStorage();
        if (checkbox.checked) showQuote();
    });

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('.task-text').textContent;
        const completed = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showQuote() {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = random;
}
