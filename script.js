const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
let tasks = [];

class Task {
    constructor(addDate, text, completed)  {
        this.addDate = Date.now();
        this.text = text;
        this.completed = false;
    }
}

function addTask() {
    if (inputBox.value === ''){
        alert('You must write something');
    }
    else {
        const newTask = new Task(undefined, inputBox.value);
        tasks.push(newTask);
        console.log(tasks);
        renderTasks();
    }
    inputBox.value = '';
    saveData();
}

function renderTasks() {
    listContainer.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text}
            <span class="deleteBtn" data-id="${task.addDate}">\u00d7</span>
        `;

        if (task.completed) {
            li.classList.add('checked');
        }

        // Добавляем обработчик для пометки выполнения
        li.addEventListener('click', () => toggleComplete(task.addDate));

        listContainer.appendChild(li);
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем срабатывание родительского li
            deleteTask(e.target.dataset.id);
        });
    });
}

function toggleComplete(addDate) {
    const taskIndex = tasks.findIndex(task => task.addDate === addDate);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
        saveData();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.addDate.toString() !== id.toString());
    renderTasks();
    saveData();
}

function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function showTask(){
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}
showTask();