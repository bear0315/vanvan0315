let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})"> ${task.text} <button onclick="deleteTask(${index})">x</button>`;
            taskList.appendChild(li);
        });

    const taskInput = document.getElementById('taskInput');
    const addButton = document.querySelector('button:not(.delete)');
    const deleteAllButton = document.querySelector('.delete');

        if (filter === 'active') {
            taskInput.disabled = false;
            addButton.disabled = false;
            taskInput.style.display = 'block';
            addButton.style.display = 'block';
            deleteAllButton.style.display = 'none';
        } else if (filter === 'completed') {
            taskInput.style.display = 'none';
            addButton.style.display = 'none';
            deleteAllButton.style.display = 'block';
        } else {
            taskInput.disabled = false;
            addButton.disabled = false;
            taskInput.style.display = 'block';
            addButton.style.display = 'block';
            deleteAllButton.style.display = 'block';
        }
    }

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteAllTasks() {
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    document.querySelectorAll('.tabs div').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tabs div').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderTasks(this.id);
        });
    });

    renderTasks();

function getUniqueElements(A1, A2) {
    const uniqueA1 = A1.filter(element => !A2.includes(element));
    const uniqueA2 = A2.filter(element => !A1.includes(element));

    return [...uniqueA1, ...uniqueA2];
}

const A1 = prompt("Nhập các phần tử của mảng A1 (cách nhau bằng dấu phẩy):")
    .split(",")
    .map(element => element.trim());

const A2 = prompt("Nhập các phần tử của mảng A2 (cách nhau bằng dấu phẩy):")
    .split(",")
    .map(element => element.trim());

const uniqueElements = getUniqueElements(A1, A2);
console.log("Mảng các phần tử không trùng nhau:", uniqueElements);
alert("Mảng các phần tử không trùng nhau: " + uniqueElements.join(", "));
