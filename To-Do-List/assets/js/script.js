document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        addTask(taskText, false);
        taskInput.value = '';
        saveTasks();
    });

    function addTask(text, isCompleted) {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed', checkbox.checked);
            saveTasks();
        });

        const taskText = document.createElement('span');
        taskText.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            saveTasks();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            tasks.push({
                text: item.querySelector('span').textContent,
                completed: checkbox.checked,
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('lastSavedDate', new Date().toDateString());
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const lastSavedDate = localStorage.getItem('lastSavedDate');
        const today = new Date().toDateString();

        if (lastSavedDate !== today) {
            const remainingTasks = savedTasks.filter((task) => !task.completed);
            localStorage.setItem('tasks', JSON.stringify(remainingTasks));
            localStorage.setItem('lastSavedDate', today);
        }

        const tasksToLoad = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksToLoad.forEach((task) => {
            addTask(task.text, task.completed);
        });
    }
});
