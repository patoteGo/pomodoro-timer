let tasks = [];

const addTaskBtn = document.querySelector('#add-task-btn');
const taskContainer = document.querySelector('#task-container');
const startTimerBtn = document.querySelector('#start-timer-btn');
const resetTimerBtn = document.querySelector('#reset-timer-btn');




function updateTime() {
	chrome.storage.local.get(['timer'], (res) => {
		const time = document.querySelector('#time');
		const minutes = `${25 - Math.ceil(res.timer / 60)}`.padStart(2, '0')
		const seconds = res.timer % 60 !== 0 ? (`${60 - res.timer % 60}`).padStart(2, '0') : '00'
		time.textContent = `${minutes} : ${seconds}`
	})
}

updateTime()
setInterval(updateTime, 1000)

resetTimerBtn.addEventListener('click', ()=> {
	chrome.storage.local.set({
		timer: 0,
		isRunning: false
	}, ()=> {
		startTimerBtn.textContent = 'Start Timer'
	})
})

startTimerBtn.addEventListener('click', () => {
	chrome.storage.local.get(['isRunning'], (res) => {
		chrome.storage.local.set({
			isRunning: !res.isRunning,
		}, () => {
			startTimerBtn.textContent = !res.isRunning ? 'Pause Timer' : 'Start Timer'
		});
	});
});

addTaskBtn.addEventListener('click', () => addTask());

chrome.storage.sync.get(['tasks'], (res) => {
	tasks = res.tasks ? res.tasks : [];
	renderTasks();
});

function saveTasks() {
	chrome.storage.sync.set({
		tasks,
	});
}

function renderTask(taskNum) {
	const taskRow = document.createElement('div');

	const text = document.createElement('input');
	text.type = 'text';
	text.placeholder = 'Enter a task...';
	text.value = tasks[taskNum];

	text.addEventListener('change', () => {
		tasks[taskNum] = text.value;
		saveTasks();
	});

	const deleteBtn = document.createElement('input');
	deleteBtn.type = 'button';
	deleteBtn.value = 'X';

	deleteBtn.addEventListener('click', () => {
		deleteTask(taskNum);
		saveTasks();
	});

	taskRow.appendChild(text);
	taskRow.appendChild(deleteBtn);

	taskContainer.appendChild(taskRow);
}
function addTask() {
	const taskNum = tasks.length;
	tasks.push('');
	renderTask(taskNum);
}

function deleteTask(taskNum) {
	tasks.splice(taskNum, 1);
	renderTasks();
}

function renderTasks() {
	taskContainer.textContent = '';
	tasks.forEach((taskText, taskNum) => {
		renderTask(taskNum);
	});
}
