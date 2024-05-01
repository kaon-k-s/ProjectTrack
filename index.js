//Set up an event listener for the "click" event on the "newProjectButton" button. When clicked, the openNewProjectGenerator function will be triggered
window.onload = function() { 
    document.getElementById("newProjectButton").onclick = openNewProjectGenerator;
}

//Collect and launch functions, responsible for functionality of a pop-up with the form for a new project setup 
function openNewProjectGenerator() {
    newProjectGenerator();
    document.getElementById("newProjectGenerator").style.display='block';
    document.getElementById("closeNewProjectGenerator").onclick = closeNewProjectGenerator;
    document.getElementById("addProjPart").onclick = addNewProjPart;
    dueDate();
    document.getElementById("openNewProj").onclick = Launch;
}

//Create the new-project-form-pop-up. Insert the form-html-code in <div id="toInputPopUp"></div>, that already exists in index.html 
function newProjectGenerator() { 
    let newProjWindowContent = `<div class= "popUps" id="newProjectGenerator">
                    <h3>New Project</h3>
                    <div><button class="closePopUp" id="closeNewProjectGenerator">&#10006;</button></div>
                    <form id="formNewProj">
                        <label for="projName">Project Name</label>
                        <input type="text" id="projName" name="projName" placeholder="Project Name"><br><br>
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate" placeholder="Start Date"><br><br>
                        <label for="dueDate">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate" placeholder="Due Date"><br><br>
                        <label for="addProjPart">Add Project part </label><button type="button" id="addProjPart">&#65291;</button><br><br>
                        <button type="button" id="openNewProj">Let's go!</button>
                    </form>
                </div>`;

    document.getElementById("toInputPopUp").innerHTML = newProjWindowContent;
}

//Close the pop-up
function closeNewProjectGenerator() {
    document.getElementById('newProjectGenerator').style.display='none';
}

//Check a due date, show alert if the due date is earlier than a start date.
function dueDate() {
    var dueDate = document.querySelector("#dueDate");

    dueDate.addEventListener("change", dueDateCheck);

    function dueDateCheck() {
        var startDateValue = document.getElementById("startDate").value;
        var dueDateValue = document.getElementById("dueDate").value;

        var startDate = new Date(startDateValue);
        var dueDate = new Date(dueDateValue);

        if (startDate.getTime() > dueDate.getTime()) {
            alert("The start date is later than the due date.");
            document.getElementById("dueDate").focus();
        }
    }
}

//Add a new input field "Project Part" in the form
function addNewProjPart() {
        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        var NewProjPart = document.createElement('input');

        NewProjPart.type = 'text';
        NewProjPart.id = 'projPart' + (document.querySelectorAll('input[id^="projPart"]').length + 1);
        NewProjPart.name = 'projPart[]';
        NewProjPart.placeholder = 'Project Part';

        var form = document.getElementById('addProjPart');

        var brInput = document.createElement('br');
        
        insertAfter(form, brInput);
        insertAfter(form, NewProjPart);
        insertAfter(form, brInput);
}

//Check if all requiered form's fields were filled in correctly, then call function for circle generation
function Launch() {
    //Check if project name is filled in 
    if (document.getElementById("projName").value == "") {
        alert("Please specify a project name.");
        document.getElementById("projName").focus();
    } else {
        //Set project name in header
        document.getElementById("projnameHeader").innerHTML = document.getElementById("projName").value;

        var cx = 55, cy = 50, r = 45;
        var slices = 0;

        //Count amount of filled-in inputs and set amount of circle slices accordingly
        for (var s = 0; s < document.querySelectorAll('input[id^="projPart"]').length; s++) {
            var projPartFieldCheck = document.querySelector('input[id="projPart' + (s + 1) + '"]');
            if (projPartFieldCheck && projPartFieldCheck.value !== "") {
                ++slices;
            }
        }

        //Call function for circle generation
        if (slices > 1) {
            createPie(cx, cy, r, slices);
        } else {
            alert("Please add at least two project parts");
        }
    }
}

//Circle related functions
var fromAngle, toAngle, fromCoordX, fromCoordY, toCoordX, toCoordY, path, d, circleS;

//Circle generation
function createPie(cx, cy, r, slices) {
    closeNewProjectGenerator();
    for (var i = 0; i < slices; i++) {
        //Create "path" element and add it to existing <svg> in index.html
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        fromAngle = i * 360 / slices;
        toAngle = (i + 1) * 360 / slices;
        fromCoordX = cx + (r * Math.cos(fromAngle * Math.PI / 180));
        fromCoordY = cy + (r * Math.sin(fromAngle * Math.PI / 180));
        toCoordX = cx + (r * Math.cos(toAngle * Math.PI / 180));
        toCoordY = cy + (r * Math.sin(toAngle * Math.PI / 180));
        d = 'M' + cx + ',' + cy + ' L' + fromCoordX + ',' + fromCoordY + ' A' + r + ',' + r + ' 0 0,1 ' + toCoordX + ',' + toCoordY + 'z';
        path.setAttributeNS(null, "d", d);
        path.id = 'slicePart' + (i + 1);
        var c = Math.floor((Math.random() * 20) + 1);
        path.setAttribute('class', 'colorPath' + c);  
        document.getElementById('pieProj').appendChild(path);

        //Calculation of text position depending on amount of slices and their position
        var cxText = 0,
            cyText = 0;
        
        if (slices == 2 || slices == 4 || slices == 8) {
            if (fromAngle < 45) {
                cxText = fromCoordX-15;
                cyText = fromCoordY+15;
            } else if (fromAngle < 90) {
                cxText = fromCoordX-18;
                cyText = fromCoordY+5;
            } else if (fromAngle < 135) {
                cxText = fromCoordX-11;
                cyText = fromCoordY-5;
            } else if (fromAngle < 180) {
                cxText = fromCoordX-5;
                cyText = fromCoordY-5;
            } else if (fromAngle < 225) {
                cxText = fromCoordX+5;
                cyText = fromCoordY-5;
            } else if (fromAngle < 270) {
                cxText = fromCoordX+10;
                cyText = fromCoordY+5;
            } else if (fromAngle < 315) {
                cxText = fromCoordX+5;
                cyText = fromCoordY+15;
            } else if (fromAngle <= 360) {
                cxText = fromCoordX-5;
                cyText = fromCoordY+20;
            }
        } else if (slices != 2 && slices != 4 && slices != 8) {
            if (fromAngle < 45) {
                cxText = fromCoordX-15;
                cyText = fromCoordY+15;
            } else if (fromAngle < 90) {
                cxText = fromCoordX-18;
                cyText = fromCoordY+3;
            } else if (fromAngle < 135) {
                cxText = fromCoordX-5;
                cyText = fromCoordY-10;
            } else if (fromAngle < 180) {
                cxText = fromCoordX;
                cyText = fromCoordY-5;
            } else if (fromAngle < 225) {
                cxText = fromCoordX+10;
                cyText = fromCoordY;
            } else if (fromAngle < 270) {
                cxText = fromCoordX+10;
                cyText = fromCoordY+15;
            } else if (fromAngle < 315) {
                cxText = fromCoordX-4;
                cyText = fromCoordY+17;
            } else if (fromAngle <= 360) {
                cxText = fromCoordX-5;
                cyText = fromCoordY+20;
            }
        }

        //Add text from the form fields to the circle
        var projPartFieldCheck = document.querySelector('input[id="projPart' + (i + 1) + '"]');
        var content = projPartFieldCheck.value;

        function createPieText(cxText, cyText, content) {
            text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttributeNS(null, "x", cxText);
            text.setAttributeNS(null, "y", cyText);
            text.innerHTML = "&#10174;" + content;
            text.setAttribute("style", "font-size: 3px"); 
            document.getElementById('pieProj').appendChild(text);
        }
        createPieText(cxText, cyText, content);
    }

    //Add decoration circle in the center
    circleS = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var rcircleS = 2;

    circleS.setAttributeNS(null, "cx", cx);
    circleS.setAttributeNS(null, "cy", cy);
    circleS.setAttributeNS(null, "r", rcircleS);
    document.getElementById('pieProj').appendChild(circleS);
}



