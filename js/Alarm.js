var alarmSound = new Audio();
alarmSound.src = "ringtone/spider.mp3";



//creating function to set alarm
function setAlarm() {
    var ms = document.getElementById("alarmTime").valueAsNumber;
    if(isNaN(ms)) {
        alert("Invalid Date");
        return;
    }
    var alarm = new Date(ms);
    var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(),alarm.getUTCSeconds());
    var differenceInMs = alarmTime.getTime() - (new Date()).getTime();

    if(differenceInMs < 0) {
        alert("Check your daily schedule");
        return;
    }

    setTimeout(initAlarm, differenceInMs);
};

function initAlarm() {
    alarmSound.play();
    document.getElementById("setalarmbutton").style.display = '';
};


function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById("setalarmbutton").style.display = 'none';
}