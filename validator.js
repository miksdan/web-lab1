"use strict";
let x, y, r;

//

function set_X_value(id){
    x = document.getElementById(id).value;
    document.getElementById('x-value-select').innerText = "X = " + x;
}

document.getElementById("checkButton").onclick = function () {
    let str;
    if (validateX() && validateY()) {
        
        var checkboxes = document.querySelectorAll('input[type="checkbox"][name="r-in"]');
        
        checkboxes.forEach(function(checkbox) {
            
                if (checkbox.checked) {
                    r = checkbox.value;
                    str = '?x=' + x + '&y=' + y + '&r=' + r;
                    fetch("script.php" + str, {
                        method: "GET",
                        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                    }).then(response => response.text()).then(function (serverAnswer) {
                        setPointer();
                        document.getElementById("output").innerHTML = serverAnswer;
                    }).catch(err => createNotification("HTTP error. Please try again later." + err));
                }

        });
    }
};

function createNotification(message) {
    let outputContainer = document.getElementById("output");
    if (outputContainer.contains(document.querySelector(".notification"))) {
        let querySelector = document.querySelector(".notification");
        querySelector.textContent = message;
        querySelector.classList.replace("outputNote", "errorNote");
    } else {
        let notificationTableRow = document.createElement("p");
        notificationTableRow.innerHTML = "<span class='notification errorNote'/>";
        outputContainer.prepend(notificationTableRow);
        let span = document.querySelector(".notification");
        span.textContent = message;
    }
}

function validateX() {
    try {
        if (x != null) return true;
        else createNotification("X value is wrong!");
    } catch (err) {
        createNotification("X value is wrong!");
        return false;
    }
}

function validateY() {
    y = document.querySelector("input[name=y-in]").value.replace(",", ".");
    if (y === undefined) {
        createNotification("Y not entered!");
        return false;
    } else if (!isNumeric(y)) {
        createNotification("Y is not a number!");
        return false;
    } else if (!((y > -3) && (y < 5))) {
        createNotification("Y is out of the range of admissible values!");
        return false;
    } else return true;
}

function validateR() {
    try {
        var inputElements = document.getElementsByName('r-in');
        for (var i= 0; inputElements[i]; ++i){
            if(inputElements[i].checked){
                r = inputElements[i].value;
            }
        }
        return true;
    } catch (err) {
        return false;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function setPointer() {
    let pointer = document.getElementById("pointer");
    pointer.style.visibility = "visible";
    pointer.setAttribute("cx", x/r*2 * 60 + 150);
    pointer.setAttribute("cy", -y/r*2 * 60 + 150);
}