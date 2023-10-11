"use strict";

var inputs = document.getElementsByName("r-in");
for(var i = 0; i < inputs.length; i++) inputs[i].onchange = checkboxHandler;

function checkboxHandler(e) {
    for(var i = 0; i < inputs.length; i++)
        if(inputs[i].checked && inputs[i] !== this) inputs[i].checked = false;
}