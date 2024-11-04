"use strict";

window.addEventListener("load", function(){
    var clickerButton = this.document.getElementsByName("clickerButton")[0]; //The clicker button
    var upgradeButton = this.document.getElementsByClassName("upgradeButton"); //The upgrade buttons
    var upgradeCost = this.document.getElementsByClassName("upgradeCost"); //The cost of each upgrade
    var upgradeName = this.document.getElementsByClassName("upgradeName"); //The name of each upgrade
    var currencyText = this.document.getElementsByName("currency")[0]; //The text for the user's currency
    var upgradeOwned = new Array.apply(0, upgradeButton.length);
    var clicked = 0; //Mainly a debug var but is used for displaying the user's money
    var clickScale = 1; //For if any of the upgrades increase money per click
    console.log("Page Loaded Successfully");
    console.log(upgradeButton);


    clickerButton.addEventListener("click", function(){ //When clicker is clicked it will put money up
        clicked++;
        currencyText.textContent = "$ " + clicked;
        console.log("The button has been clicked!!! We are now at: " + clicked + " Clicks!");
    })

    for(let i=0; i < upgradeButton.length; i++){
        upgradeButton[i].addEventListener("click", function(){
            console.log("This upgrade costs: " + upgradeCost[i].textContent) 
            upgradeName[i].textContent = 
            
            
            console.log("Upgrade "+ i + " purchased!");
    })}
})

