"use strict";

window.addEventListener("load", function(){
    var clickerButton = this.document.getElementsByName("clickerButton")[0]; //The clicker button
    var upgradeButton = this.document.getElementsByClassName("upgradeButton"); //The upgrade buttons
    var upgradeCost = this.document.getElementsByClassName("upgradeCost"); //The cost of each upgrade
    var upgradeName = this.document.getElementsByClassName("upgradeName"); //The name of each upgrade
    var currencyText = this.document.getElementsByName("currency")[0]; //The text for the user's currency
    var currency = currencyText.textContent.substring(1);
    var upgradeOwned = [...Array(upgradeButton.length).fill(0)]; //The amount of each upgrade the user owns
    var clickScale = 1; //For if any of the upgrades increase money per click
    console.log("Page Loaded Successfully");
    console.log(upgradeOwned);


    clickerButton.addEventListener("click", function(){ //When clicker is clicked it will put money up
        currency++;
        console.log("Currency: " + currency);
        currencyText.textContent = "$ " + currency;
        console.log("The button has been clicked!!! We are now at: " + currency + " Clicks!");
    })

    for(let i=0; i < upgradeButton.length; i++){
        upgradeButton[i].addEventListener("click", function(){
            console.log("This upgrade costs: " + upgradeCost[i].textContent) 
            if (parseInt(currency) >= upgradeCost[i].textContent){
                currency = currency - upgradeCost[i].textContent;
                changeCurrency(currency);
                upgradeOwned[i]++;
                upgradeName[i].textContent = "Upgrade " + (i+1) + " (" + upgradeOwned[i] + ")";
                console.log("Upgrade Bought!");
            }
            else{
                console.log("Upgrade not bought.");
            }

            console.log("The user now owns " + upgradeOwned[i] + " of " + upgradeName[i].textContent);
    })}


    function changeCurrency(currency){
        if(currency >= 0){
        currencyText.textContent = currencyText.textContent = "$ " + currency;
        }
        else{
            console.log("Can't put currency below 0");
            return;
        }
    }
})



