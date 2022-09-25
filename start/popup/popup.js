let tasks = [];

const addTaskBtn = document.querySelector('#add-task-btn');
const taskContainer = document.querySelector('#task-container');

addTaskBtn.addEventListener('click', () => addTask());

chrome.storage.sync.get(['tasks'], (res) => {
	tasks = res.tasks ? res.tasks : []
	renderTasks()
})

function saveTasks() {
	chrome.storage.sync.set({
		tasks, 
	})
}

function renderTask(taskNum) {
	const taskRow = document.createElement('div');

	const text = document.createElement('input');
	text.type = 'text';
	text.placeholder = 'Enter a task...';
	text.value = tasks[taskNum]

	text.addEventListener('change', () => {
		tasks[taskNum] = text.value;
		saveTasks()
	});

	const deleteBtn = document.createElement('input');
	deleteBtn.type = 'button';
	deleteBtn.value = 'X';

	deleteBtn.addEventListener('click', () => {
		deleteTask(taskNum)
		saveTasks()
	});

	taskRow.appendChild(text);
	taskRow.appendChild(deleteBtn);

	
	taskContainer.appendChild(taskRow);
}
function addTask() {
	const taskNum = tasks.length;
	tasks.push('');
	renderTask(taskNum)
}

function deleteTask(taskNum) {
	tasks.splice(taskNum, 1);
	renderTasks()
}

function renderTasks() {
	taskContainer.textContent = ''
	tasks.forEach((taskText, taskNum) => {
		renderTask(taskNum)
	})
}
