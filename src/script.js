//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// [Index - JavaScript] //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// global variables
var originalHeight, originalWidth, totalProjects = 3

// function to enlarge image to 20%
function enlarge(element) {
    originalHeight = element.clientHeight
    originalWidth = element.clientWidth
    var newHeight = originalHeight + (element.clientHeight * (20 / 100))
    newHeight += "px"
    var newWidth = originalWidth + (element.clientWidth * (20 / 100))
    newWidth += "px"
    element.style.height = newHeight
    element.style.width = newWidth
}

// function to set the image to original size
function backToNormal(element) {
    originalHeight += "px"
    originalWidth += "px"
    element.style.height = originalHeight
    element.style.width = originalWidth
}

// function to add new project
function addProject() {
    var title = document.getElementById("title").value
    var year = document.getElementById("year").value
    var desc = document.getElementById("desc").value
    var technologies = ""
    
    // storing checked technologies
    if (document.getElementById("technology1").checked) {
        technologies += document.getElementById("technology1").value
    }
    if (document.getElementById("technology2").checked) {
        if (technologies != "") {
            technologies += ", "
        }
        technologies += document.getElementById("technology2").value
    }
    if (document.getElementById("technology3").checked) {
        if (technologies != "") {
            technologies += ", "
        }
        technologies += document.getElementById("technology3").value
    }
    if (document.getElementById("technology4").checked) {
        if (technologies != "") {
            technologies += ", "
        }
        technologies += document.getElementById("technology4").value
    }
    if (document.getElementById("technology5").checked) {
        if (technologies != "") {
            technologies += ", "
        }
        technologies += document.getElementById("technology5").value
    }

    // validation checks
    if (title === "" || year === "" || desc === "" || technologies === "") {
        document.getElementById("errorMessage").textContent = "Kindly Fill all the input fields"
    }
    else if (isNaN(year)) {
        document.getElementById("errorMessage").textContent = "\"Year\" Field can only be a number"
    }
    else {
        // adding new project
        list = document.getElementById("projectsBlock")
        newli = document.createElement("li");
        newli.setAttribute('class', 'project')
        heading = document.createElement("h2");
        heading.textContent = title + " (" + year + ")"
        paragraph = document.createElement("p");
        paragraph.innerHTML = desc + "<br> <b> Technologies Used: </b>" + technologies
        newli.appendChild(heading)
        newli.appendChild(paragraph)
        list.appendChild(newli)
        document.getElementById("errorMessage").textContent = "Project Added Successfully"
        document.getElementById("errorMessage").style.color = "rgb(7, 211, 0)"
        
        // updating project count and displaying it
        totalProjects++
        document.getElementById("projectsCount").textContent = totalProjects
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// [MyTimeTable - JavaScript] ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// function to search data in table
function searchInTable(element) {
    var searchedText, table, tr, i, j
    searchedText = element.value.toUpperCase()
    table = document.getElementById("myTimeTable")
    tr = table.getElementsByTagName("tr")

    for (i = 1; i < tr.length; i++) {
        var columns = [], temp
        temp = tr[i].getElementsByTagName("th")
        for (j = 0; j < temp.length; j++) {
            columns.push(temp[j])
        }
        
        temp = tr[i].getElementsByTagName("td")
        for (j = 0; j < temp.length; j++) {
            columns.push(temp[j])
        }

        for (j = 0; j < columns.length - 1; j++) {
            var columnText = columns[j].textContent
            if (columnText.toUpperCase().indexOf(searchedText) < 0) {
                tr[i].style.display = "none"
            } else {
                tr[i].style.display = ""
                break
            }
        }
    }
}

// function to delete row from the table
function deleteRow(element) {
    var tr;
    tr = element.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
}

// function to edit row of the table
function editRow(element) {
    var tr, columns = [], temp, i;
    tr = element.parentNode.parentNode;

    temp = tr.getElementsByTagName("th")
    for (i = 0; i < temp.length; i++) {
        columns.push(temp[i])
    }
    
    temp = tr.getElementsByTagName("td")
    for (i = 0; i < temp.length; i++) {
        columns.push(temp[i])
    }

    for (i = 0; i < columns.length - 1; i++) {
        var text = columns[i].textContent;
        columns[i].innerHTML = "<input type='text' value='" + text + "'>";
    }

    element.value = "Save";
    element.setAttribute('onclick', 'saveRow(this)');
}

// function to save edited row
function saveRow(element) {
    var tr, columns = [], temp, i;
    tr = element.parentNode.parentNode;

    temp = tr.getElementsByTagName("th")
    for (i = 0; i < temp.length; i++) {
        columns.push(temp[i])
    }
    
    temp = tr.getElementsByTagName("td")
    for (i = 0; i < temp.length; i++) {
        columns.push(temp[i])
    }

    for (i = 0; i < columns.length - 1; i++) {
        var text = columns[i].children[0].value;
        columns[i].innerHTML = text;
    }

    element.value = "Edit";
    element.setAttribute('onclick', 'editRow(this)');
}

// function to add row in the table
function addRow(element) {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;
    var input5 = document.getElementById("input5").value;
    var input6 = document.getElementById("input6").value;

    // validation checks
    if (input1 === "" || input2 === "" || input3 === "" || input4 === "" || input5 === "" || input6 === "") {
        document.getElementById("errorMessage").textContent = "Kindly fill all the input fields"
    }
    else {
        var tr, columns = [], temp, i;
        tr = element.parentNode.parentNode;

        // getting columns
        temp = tr.getElementsByTagName("th")
        for (i = 0; i < temp.length; i++) {
            columns.push(temp[i])
        }
        
        temp = tr.getElementsByTagName("td")
        for (i = 0; i < temp.length; i++) {
            columns.push(temp[i])
        }

        for (i = 0; i < columns.length - 1; i++) {
            var text = columns[i].children[0].value;
            columns[i].innerHTML = text;
        }

        // saving column values
        columns[0].innerHTML = input1;
        columns[1].innerHTML = input2;
        columns[2].innerHTML = input3;
        columns[3].innerHTML = input4;
        columns[4].innerHTML = input5;
        columns[5].innerHTML = input6;
        document.getElementById("errorMessage").textContent = "";
        columns[6].innerHTML = "<input type=\"button\" value=\"Edit\" class=\"buttonStyle\" onclick=\"editRow(this)\"> <input type=\"button\" value=\"Delete\" class=\"buttonStyle\" onclick=\"deleteRow(this)\">"

        // making a row at the end for adding new rows
        var td;
        var newTr = document.createElement("tr");
        var th = document.createElement("th");
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "input1");
        th.appendChild(input);
        newTr.appendChild(th);
        
        for (i = 0; i < 5; i++) {
            input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", "input" + (i + 2));
            td = document.createElement("td");
            td.appendChild(input);
            newTr.appendChild(td);
        }
        
        input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("value", "Add Row");
        input.setAttribute("class", "buttonStyle");
        input.setAttribute("onclick", "addRow(this)");
        td = document.createElement("td");
        td.appendChild(input);
        newTr.appendChild(td);
        var p = document.createElement("p");
        p.setAttribute("id", "errorMessage");
        td.appendChild(p);
        tr.parentNode.appendChild(newTr);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// [CourseVideos - JavaScript] ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// function to play video
function play(element) {
    element.parentNode.parentNode.children[0].play();
}

// function to pause video
function pause(element) {
    element.parentNode.parentNode.children[0].pause();
}

// function to change speed of video
function changeSpeed(action, element) {
    if (action === "up") {
        element.parentNode.parentNode.children[0].playbackRate += 0.5;
    } else {
        element.parentNode.parentNode.children[0].playbackRate -= 0.5;
    }
}

//function to change volume of video
function changeVolume(action, element) {
    if (action === "up") {
        element.parentNode.parentNode.children[0].volume += 0.2;
    } else {
        element.parentNode.parentNode.children[0].volume -= 0.2;
    }
}