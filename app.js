const todoInput = document.getElementById('todo-input');
const datetimeInput = document.getElementById('datetime-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const stats = document.getElementById('stats');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    todoList.innerHTML = '';

    if (tasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'list-group-item empty-message';
        emptyMessage.textContent = 'No tasks yet. Add one above!';
        todoList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center flex-wrap';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-2';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed');
        }

        const timeLabel = document.createElement('span');
        timeLabel.className = 'task-time';
        timeLabel.textContent = `(📅 ${task.datetime || 'No time'})`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ms-auto';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(timeLabel);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateStats();
}

function addTask() {
    const text = todoInput.value.trim();
    const datetime = datetimeInput.value;

    if (text === '') return;

    tasks.push({
        text: text,
        completed: false,
        datetime: datetime
    });

    saveTasks();
    renderTasks();
    todoInput.value = '';
    datetimeInput.value = '';
    todoInput.focus();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function updateStats() {
    const completedCount = tasks.filter(task => task.completed).length;
    stats.textContent = `${completedCount} of ${tasks.length} tasks completed`;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();
