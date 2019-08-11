window.addEventListener('keydown', function (e) {
	if (e.keyCode === 32) // space
		e.preventDefault();
	if (e.keyCode === 8) // backspace
		e.preventDefault();
	if (e.keyCode === 9) // tab
		e.preventDefault();
	if (e.ctrlKey && e.keyCode === 65) // select all
		e.preventDefault();
	if (e.ctrlKey && e.keyCode === 83) // save // On mac LCommand: 91 RCommand: 93
		e.preventDefault();
});