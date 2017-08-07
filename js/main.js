var request = new XMLHttpRequest();
request.open('GET', ' https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture');
request.onload = function () {
    var studentsData = JSON.parse(request.responseText);
    console.log(studentsData.results);
    renderHTML(studentsData.results);
};
request.send();
var dataContainer = document.getElementById("json-table");

function renderHTML(data) {
    var htmlString = "";
    for (i = 0; i < data.length; i++) {
        htmlString += "<tr onclick=\"showInfo(" + i + ")\">";
        htmlString += "<td><img src=\"" + data[i].picture.medium + "\"></td>";
        htmlString += "<td>" + data[i].name.title + "</td>";
        htmlString += "<td>" + data[i].name.first + "</td>";
        htmlString += "<td>" + data[i].name.last + "</td>";
        htmlString += "</tr>";
    };
    dataContainer.insertAdjacentHTML('beforeend', htmlString);
};
var order = 1;
// n =1 ascending order; n=0 descending 
function sortTable(n) {
    var table, rows, x, y;
    table = document.getElementById("json-table");
    rows = table.getElementsByTagName("TR");
    var len = rows.length;
    var order = document.getElementById('sortType').value;
    for (j = 1; j < len; j++)
        for (i = 1; i < (len - j); i++) {

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (order == 1) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                }
            } else if (order == 0) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                }
            }
            else {
                console.log('wrong order parameter');
            }
        }

}

function showInfo(id) {
    var popup = document.createElement('div');
    var wrapper = document.getElementById('wrapper');
    var studentsData = JSON.parse(request.responseText);
    var data = studentsData.results;
    popup.className = 'popup';
    popup.id = 'test';
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    cancel.innerHTML = 'X';
    cancel.onclick = function () { popup.parentNode.removeChild(popup) };
    var message = document.createElement("table");
    message.innerHTML = "<tr><td> Image</td><td><img src=\"" + data[id].picture.large + "\"></td>";
    message.innerHTML += "<tr><td> street </td><td>" + data[id].location.street + "</td>";
    message.innerHTML += "<tr><td> city </td><td>" + data[id].location.city + "</td>";
    message.innerHTML += "<tr><td> state </td><td>" + data[id].location.state + "</td>";
    message.innerHTML += "<tr><td> email </td><td>" + data[id].email + "</td>";
    message.innerHTML += "<tr><td> phone </td><td>" + data[id].phone + "</td>";
    popup.appendChild(message);
    popup.appendChild(cancel);
    document.body.appendChild(popup);
}

