async function addTask() {
    const task = document.getElementById('task').value;
    if (task) {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });
        document.getElementById('task').value = '';
        loadTasks();
    }
}

async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        tasksList.appendChild(li);
    });
}

window.onload = loadTasks;
