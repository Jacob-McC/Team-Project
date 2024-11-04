"use strict";

window.addEventListener("load", function(){
    var clickerButton = this.document.getElementsByName("clickerButton")[0]; //The clicker button
    var upgradeButton1 = this.document.getElementsByName("upgrade1")[0]; //Upgrade 1 button
    var currencyText = this.document.getElementsByName("currency")[0]; //The text for the user's currency
    var clicked = 0; //Mainly a debug var but is used for displaying the user's money
    var clickScale = 1; //For if any of the upgrades increase money per click
    console.log("Page Loaded Successfully");


    clickerButton.addEventListener("click", function(){ //When clicker is clicked it will put money up
        clicked++;
        currencyText.textContent = "$ " + clicked;
        console.log("The button has been clicked!!! We are now at: " + clicked + " Clicks!");
    })

    upgradeButton1.addEventListener("click", function(){
        console.log("Upgrade 1 purchased! :) ");
    })
})

