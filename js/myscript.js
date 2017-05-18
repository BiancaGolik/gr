function setWeek(n)
{
    document.getElementById("weeksNum").innerHTML = "Week " + n;
    document.getElementById("weeksNum").setAttribute("weekNum", n);
    var days = document.getElementById('calendar').children;
    var lastDay = n * 7;
    
    document.getElementById("sunday").innerHTML = "DAY " + lastDay;
    for (var i = 7; i > 0; i--, lastDay--)
    {
        days[i].firstChild.innerHTML = "DAY " + lastDay;

    }

    if (n == 1)
        document.getElementById("weekMinus").style.display = "none";
    else
        document.getElementById("weekMinus").style.display = "inline-block";
    if (n == 12)
        document.getElementById("weekPlus").style.display = "none";
    else
        document.getElementById("weekPlus").style.display = "inline-block";

    /*set progress bar*/
    var points = document.getElementById('progress_bar').childNodes;
    var nth = n * 2 - 1;
    for (var i = 0; i < points.length; i++) {
        if (i < nth - 2)
            points[i].setAttribute("class", "past_weeks");
        else if (i < nth)
                points[i].setAttribute("class", "active_week");
        else
            points[i].setAttribute("class", "");
    }
}

function setWeekBar(id) {
    setWeek(id);
}

function changeWeek(n)
{
    var num = document.getElementById("weeksNum").getAttribute("weekNum");
    setWeek(parseInt(parseInt(num) + parseInt(n)));
}

function chageOptMenu(n)
{
    var pastActive = document.getElementById("active");
    pastActive.id = "";
    var opts = document.getElementById('options').children;
    opts[n].id = "active";

}
function pickCol(n)
{
    var pastActive = document.getElementById("dayChosen");
    var days = document.getElementById('calendar').children;
    days[n].id = (days[n].id != "dayChosen") ? "dayChosen" : "";

    if (pastActive != null) {
        pastActive.id = "";
        var shakes = document.getElementsByClassName("shake_active");
        for (var i = shakes.length - 1; i >= 0; i--)
            shakes[i].setAttribute("class", "shake");
    }

    var shakes = days[n].getElementsByClassName("shake");
    for (var i = shakes.length - 1; i >= 0; i--)
        shakes[i].setAttribute("class", "shake_active");


}

function chooseFood(id) {
    var foods = document.getElementById('food').children;
    if (foods[id - 1].getAttribute("enable") == "true") {
        foods[id - 1].setAttribute("enable", "false");
        foods[id - 1].setAttribute("src", "images/" + id + "0.jpg");
    }
    else {
        foods[id - 1].setAttribute("enable", "true");
        foods[id - 1].setAttribute("src", "images/" + id + "1.jpg");
    }
}

function checkGym(id)
{
    var elm = document.getElementById('calendar').children[id].lastChild.children[0];
    if (elm.getAttribute("enable") == "true") {
        elm.setAttribute("enable", "false");
        elm.setAttribute("src", "images/gym1.jpg");
    }
    else {
        elm.setAttribute("enable", "true");
        elm.setAttribute("src", "images/gym2.jpg");
    }
}

function showMenu()
{
    if (document.getElementById('header_line').style.top == "0px")
        document.getElementById('header_line').style.top = "-260px";
    else
        document.getElementById('header_line').style.top = "0px";
}

function setCircle(id) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    var cx = (id - 1) * 24 + 10;
    circle.setAttribute("cy", "15");
    circle.setAttribute("r", "6");
    circle.setAttribute("cx", cx);
    circle.setAttribute("onclick", "setWeekBar(" + id + ")");
    document.getElementById("progress_bar").appendChild(circle);
}

function setLine(id) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    var x1 = (id - 2) * 24 + 17;
    var x2 = x1 + 10;
    line.setAttribute("y1", "15");
    line.setAttribute("y2", "15");
    line.setAttribute("x1", x1);
    line.setAttribute("x2", x2);
    document.getElementById("progress_bar").appendChild(line);
}

function drawProgresBar() {
    setCircle(1);
    for (var i = 2; i <= 12; i++) {
        setLine(i);
        setCircle(i);
    }
}
function loadInitial() {
    var days = document.getElementById('calendar').children;
    var hours = ["6:00AM", "9:00AM", "12:00PM", "3:00PM", "6:00PM", ""];
    for (i = 1; i < days.length - 1; i++) {
        for (var j = 0; j < 8; j++) {
            var newObj = document.createElement('div');
            if (j > 0 && j < 7) {
                newObj.innerHTML = "<h4>" + hours[j - 1] + "</h4><p><b>" + diet[1][i - 1][j - 1] + "</b></p>";
                if (diet[1][i - 1][j - 1] == "Bod•ē Shake")
                    newObj.className = "shake";
            }
            if (j == 7)
            {
                var gym = document.createElement('img');
                gym.setAttribute("src", "images/gym1.jpg");
                gym.setAttribute("enable", "false");
                gym.setAttribute("onclick", "checkGym(" + i + ")");
                newObj.appendChild(gym);
            }
            days[i].appendChild(newObj);
        }
    }
    drawProgresBar();
    setWeek(1);

}
