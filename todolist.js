function time(a) {
    let currTime;
    if (a.getHours() >= 10) {
        currTime = a.getHours();
    } else {
        currTime = "0" + a.getHours();
    }
    if (a.getMinutes() >= 10) {
        currTime = currTime + ":" + a.getMinutes();
    } else {
        currTime = currTime + ":0" + a.getMinutes();
    }
    if (a.getSeconds() >= 10) {
        currTime = currTime + ":" + a.getSeconds();
    } else {
        currTime = currTime + ":0" + a.getSeconds();
    }
    return currTime;
}
function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    //Entry time
    a = new Date();
    currTime = time(a);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    date = a.toLocaleDateString(undefined, options);
    date = date + " - " + currTime;

    //Deadline
    deadline = document.getElementById('deadline').value;
    deadline = new Date(deadline);
    deadlineTime = time(deadline);
    deadline = deadline.toLocaleDateString(undefined,options);
    deadline1 = deadline + " - " + deadlineTime;


    if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc, date,deadline]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc, date,deadline]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                  <tr>
                  <th scope="row">${index + 1}</th>
                  <td>${element[0]}</td>
                  <td>${element[1]}</td>
                  <td>${element[2]}</td>
                  <td>${element[3]}</td>
                  <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
                  </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
}
function clearStorage() {
    if (confirm("Do you areally want to clear?")) {
        console.log("Clearing the storage");
        localStorage.clear();
        update();
    }
}
