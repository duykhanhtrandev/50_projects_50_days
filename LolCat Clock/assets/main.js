var wakeuptime = 7;
var noon = 12;
var lunchtime = 12;
var naptime = lunchtime + 2;
var partytime;
var evening = 18;

// Bắt nó hiển thị thời gian hiện tại trên trang

var showCurrentTime = function() {
    //hiển thị chuỗi trên trang web
    var clock = document.getElementById('clock');

    var currentTime = new Date();

    var hours = currentTime.getHours();
    var seconds = currentTime.getSeconds();
    var meridian = "AM";

    // Thiết lập giờ
    if (hours >= noon) {
        meridian = "PM";
    }

    if (hours > noon) {
        hours = hours - 12;
    }

    // Thiết lập phút
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // Thiết lập giây
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // ghép chuỗi hiển thị thời gian lại với nhau
    var clockTime = hours + ':' + minutes + ':' + seconds + " " + meridian + "!";
    clock.innerText = clockTime;
};

//Thiết lập đồng hồ tự tăng và thay đổi các tin nhắn và hình ảnh

var updateClock = function() {
    var time = new Date().getHours();
    var messageText;
    var image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
    var timeEventJS = document.getElementById("timeEvent");
    var lolcatImageJS = document.getElementById("lolcatImage");

    if (time == partytime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/partyTime.jpg";
        messageText = "Let's party";
    } else if (time == wakeuptime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat1.jpg";
        messageText = "Wake up!";
    } else if (time ==  lunchtime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
        messageText = "Let's have some lunch!";
    } else if (time == naptime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat3.jpg";
        messageText = "sleep tight!"
    } else if (time >= evening) {
        image = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cat_sleep.jpg";
        messageText = "Good evening!";
    } else {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
        messageText = "Good afternoon!"
    }
    console.log(messageText);
    timeEventJS.innerText = messageText;
    lolcatImage.src= image;

    showCurrentTime();
};

updateClock();

// Để đồng hồ tăng 1 lần 1 giây
var oneSecond = 1000;
setInterval (updateClock, oneSecond);

// Thiet lap nut thoi gian Party thuc hien
var partyButton = document.getElementById("partyTimeButton");

var partyEvent = function() {
    if (partytime < 0) {
        partytime = new Date().getHours();
        partyTimeButton.innerText = "Party Over!";
        partyTimeButton.style.backgroundColor = "#0A8DAB";
    } else {
        partytime = -1;
        partyTimeButton.innerText = "Party Time!";
        partyTimeButton.style.backgroundColor = "#222";
    }
};

partyButton.addEventListener("click", partyEvent);
partyEvent();

// Kích hoạt bộ chọn Đánh thức
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");

var napEvent = function() {
    naptime = napTimeSelector.value;
};

napTimeSelector.addEventListener("change", napEvent);