const timeOption = document.querySelector('#time-option')
const saveButton = document.querySelector('#save-btn')

timeOption.addEventListener('change', (e)=>{
	const val = event.target.value
	if(val < 1 || val > 60) { timeOption.value = 25}
})

saveButton.addEventListener('click', ()=> {
	chrome.storage.local.set({
		timeOption: timeOption.value,
		isRunning: false,
		timer: 0
	})
})

chrome.storage.local.get(['timeOption'], (res) => {
	const timeOptionValue = res.timeOption ? res.timeOption : 25
	timeOption.value =timeOptionValue
})