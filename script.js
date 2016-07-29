var button1 = document.getElementById("start");
button1.addEventListener("click", startOrPlay);
var button2 = document.getElementById("stop");
button2.addEventListener("click", stopOrAgain);
var pointer = document.getElementById("pointer");
var title = document.getElementById("title");
title.textContent = "Start Recording";
var recording = [];
var index = 0, length = 0, r;
function record(e) {
	recording[index] = [];
	recording[index][0] = e.clientX;	
	recording[index][1] = e.clientY;
	index++;
}
function play() {
	if(index == length) {
		clearInterval(r);
		button1.addEventListener("click", startOrPlay);
	}
	else {
	    pointer.style.top = recording[index][1] + "px";
	    pointer.style.left = recording[index][0] + "px";
	    index++;
	}
}
function startOrPlay() {
	if(button1.firstChild.textContent === "START") {
		document.addEventListener("mousemove", record);
		button1.removeEventListener("click", startOrPlay);
		title.textContent = "Recording your mouse positions...";
	}
	else {
		button1.removeEventListener("click", startOrPlay);
		index = 0;
		pointer.style.display = "inline-block";
		pointer.style.top = recording[index][1];
	    pointer.style.left = recording[index][0];
		r = setInterval(play, 10);
	}
}
function stopOrAgain() {
	if(button2.firstChild.textContent === "STOP") {
		document.removeEventListener("mousemove", record);
		length = index;
		index = 0;
		document.querySelector("#start p").textContent = "PLAY";
		document.querySelector("#stop p").textContent = "AGAIN";
		button1.addEventListener("click", startOrPlay);
		title.textContent = "Recorded";
	}
	else {
		index = 0;
		length = 0;
		recording = [];
		title.textContent = "Start Recording";
		pointer.style.display = "none";
		document.querySelector("#start p").textContent = "START";
		document.querySelector("#stop p").textContent = "STOP";
	}
}