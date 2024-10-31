"use strict";

window.addEventListener("load", function(){
    var clickerButton = this.document.getElementsByName("clickerButton")[0];
    var currencyText = this.document.getElementsByName("currency")[0];
    var clicked = 0;
    console.log("Page Loaded Successfully");


    clickerButton.addEventListener("click", function(){
        clicked++
        currencyText.textContent = "Clicks: " + clicked;
        console.log("The button has been clicked!!! We are now at: " + clicked + " Clicks!");
    })
})

