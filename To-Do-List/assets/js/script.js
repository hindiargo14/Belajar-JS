document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Tambahkan tugas
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        // Buat elemen tugas baru
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Tambahkan tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        // Kosongkan input setelah menambah tugas
        taskInput.value = '';
    });
});
