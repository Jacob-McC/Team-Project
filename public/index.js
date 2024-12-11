//I love putting all this code in one function, can't wait to see what it looks like at the end lol

var Upgrades;
var TotalMoneyEarned = 0;
var currency = 0;
var CompareLevel = 0;
var userName = "";
var upgradeButton = this.document.getElementsByClassName("upgradeButton"); //The upgrade buttons
var upgradeOwned = [...Array(upgradeButton.length).fill(0)]; //The amount of each upgrade the user owns

//Testing purposes, set to whatever userID is needed
sessionStorage.setItem("userID", 0);

if (sessionStorage.getItem("userID") == null) {
  sessionStorage.setItem("userID", 0);
}

console.log("this is the userID: " + sessionStorage.getItem("userID"));

//working for guest login

window.addEventListener("load", async function () {
  if (sessionStorage.getItem("userID") != 0) {
    await getStats();
    var UpgradeArray = Upgrades.split("-");
    //This isn't be used yet, too bad!
    console.log("This is the username " + userName);
    this.document.getElementsByName("Username")[0].textContent =
      userName + "'s Brewery";
  } else {
    this.document.getElementsByName("Username")[0].textContent =
      "Guest Brewery";
  }
  var clickerButton = this.document.getElementsByName("clickerButton")[0]; //The clicker button
  var upgradeCost = this.document.getElementsByClassName("upgradeCost"); //The cost of each upgrade
  var upgradeName = this.document.getElementsByClassName("upgradeName"); //The name of each upgrade
  var upgradeIncome = this.document.getElementsByClassName("upgradeIncome"); //The rate of income for each upgrade
  var currencyText = this.document.getElementsByName("currency")[0]; //The text for the user's currency
  var incomeText = this.document.getElementsByName("income")[0]; //The text for the user's current income
  var clickerIncome = this.document.getElementsByName("clickerIncome")[0];
  var totalRateOfIncome = 0; //The rate of income of every upgrade added up
  var clickScale = 1; //Money per click
  var LevelCounter = this.document.getElementById("CurLevel");
  var LevelPercent = this.document.getElementById("LevelPercent");
  var LevelProgressBar = this.document.getElementById("Level");
  var ClickSound = new Audio("/sounds/clicksound.wav");
  var UpgradeSound = new Audio("/sounds/upgradesound.wav");
  var levelUpSound = new Audio("/sounds/LevelUpSound.wav");
  var upgradeLevels = setLevels(upgradeButton.length);
  var endGameButton = this.document.getElementById("endGame");
  var baseCosts = [...Array(upgradeButton.length).fill(0)]; //The base cost of each upgrade
  var UpgradeNames = [
    "Beer",
    "Stein",
    "Pina colada",
    "Margarita",
    "Long Isand Iced Tea",
    "Cosmopolitan",
    "Bloody Mary",
    "Champagne",
  ];

  console.log("Page Loaded Successfully");
  console.log(upgradeOwned);

  for (let i = 0; i < upgradeButton.length; i++) {
    //Initialising the baseCost of each upgrade
    baseCosts[i] = upgradeCost[i].textContent;
  }
  console.log("Base costs loaded: " + baseCosts);

  clickerButton.addEventListener("click", function () {
    //When clicker is clicked it will put money up
    if (SoundCheckbox.checked) {
      ClickSound.play();
    }
    currency += clickScale;
    TotalMoneyEarned += clickScale;
    console.log("Total: " + TotalMoneyEarned);
    console.log("Currency: " + currency);
    currencyText.textContent = "$ " + currency;
    console.log(
      "The button has been clicked!!! We are now at: " + currency + " Clicks!"
    );
    ClickSound.currentTime = 0;
  });

  for (let i = 0; i < upgradeButton.length; i++) {
    initUpgradeButtons(upgradeButton[i]);
    upgradeButton[i].addEventListener("click", function () {
      console.log("This upgrade costs: " + upgradeCost[i].textContent);
      if (parseInt(currency) >= upgradeCost[i].textContent) {
        if (SoundCheckbox.checked) {
          UpgradeSound.play();
        }
        UpgradeSound.currentTime = 0;
        currency = currency - upgradeCost[i].textContent;
        changeCurrency(currency);
        upgradeOwned[i]++;
        upgradeName[i].textContent =
          UpgradeNames[i] + " (" + upgradeOwned[i] + ")";
        console.log("Upgrade Bought!");

        totalRateOfIncome = 0;
        for (let i = 0; i < upgradeIncome.length; i++) {
          totalRateOfIncome += upgradeOwned[i] * upgradeIncome[i].textContent;
        }
        console.log("Total rate of Income is: " + totalRateOfIncome);
        changeIncomeText(totalRateOfIncome);
        scaleUpgradeCost(baseCosts[i], upgradeOwned[i], i);
      } else {
        console.log("Upgrade not bought.");
      }

      console.log(
        "The user now owns " +
          upgradeOwned[i] +
          " of " +
          upgradeName[i].textContent
      );
    });
  }
  window.setInterval(passiveIncome, 100);

  //===============================================FUNCTIONS===========================================================

  function calculateLevel(TotalMoneyEarned) {
    var Level = TotalMoneyEarned.toString().length - 1;
    clickerIncome.textContent = "$ " + Math.pow(5, Level) + " per click";
    clickScale = Math.pow(5, Level);
    if (Level > CompareLevel && LevelUpCheckBox.checked == true) {
      window.alert("Congratulations! You have levelled up to level: " + Level);
    }
    if (Level > CompareLevel && SoundCheckbox.checked) {
      levelUpSound.play();
      levelUpSound.currentTime = 0;
    }
    CompareLevel = Level;
    if (TotalMoneyEarned > 0) {
      var NextLevel = "1" + "0".repeat(Level);
      var NextLevel = parseInt(NextLevel);
      var Progress = parseInt((TotalMoneyEarned / NextLevel) * 10);
      LevelCounter.textContent = "Current Level: " + Level;
      LevelPercent.textContent = Progress + "%";
      LevelProgressBar.value = Progress;
    } else {
      var NextLevel = 0;
      LevelCounter.textContent = "Current Level: " + 0;
      LevelPercent.textContent = 0 + "%";
      LevelProgressBar.value = 0;
    }
    //total money - previous level

    checkLevel(Level, upgradeButton, upgradeLevels);
  }

  function checkLevel(level, upgradeButton, upgradeLevels) {
    console.log("checkLevel Check: " + level);
    for (let i = 0; i < upgradeButton.length; i++) {
      if (level >= upgradeLevels[i]) {
        upgradeButton[i].disabled = false;
      }
    }
    if (level > 3) {
      this.document.getElementById("endGame").style.display = "block";
    }
  }

  function initUpgradeButtons(upgradeButton) {
    console.log("setUpgradeButtons has happened.");
    upgradeButton.disabled = true;
  }

  function setLevels(upgrades) {
    var temp = [];
    for (let i = 0; i <= upgrades; i++) {
      temp.push(i * 2);
    }
    console.log("The upgrade levels: " + temp);
    return temp;
  }

  function changeCurrency(currency) {
    if (currency >= 0) {
      currencyText.textContent = "$ " + currency;
    } else {
      console.log("Can't put currency below 0");
      return;
    }
  }

  function changeIncomeText(income) {
    incomeText.textContent = "$ " + income + "/s";
  }

  function passiveIncome() {
    console.log("Current Currency is: " + currency);
    currency += totalRateOfIncome / 10;
    TotalMoneyEarned += totalRateOfIncome / 10;
    calculateLevel(TotalMoneyEarned);
    changeCurrency(currency);
  }

  function scaleUpgradeCost(baseCost, upgradesOwned, i) {
    newCost = Math.trunc(baseCost * 1.15 ** upgradesOwned);
    console.log(
      "New cost is now " + newCost + " and now causing inflation lol."
    );
    upgradeCost[i].textContent = newCost;
  }
});

//Modal stuff
var modal = document.getElementById("Modal");
var span = document.getElementsByClassName("close")[0];
var earnedStat = document.getElementById("moneyEarnedStat");

function SettingsClick() {
  modal.style.display = "block";
  earnedStat.textContent = "$ " + TotalMoneyEarned;
}
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function endGame() {
  location.href = "http://localhost:3000/winner";
}
//Modal stuff

async function SaveClick() {
  //IMPORTANT
  if (sessionStorage.getItem("userID") == 0) {
    alert("You are a guest, saving is disabled unless you create an account!");
  } else {
    alert("Save button is working");
    const formData = new URLSearchParams();
    UserID = sessionStorage.getItem("userID");
    UserID = 1;
    //THIS IS TEMP

    formData.append("userID", UserID);
    formData.append("money", currency);
    formData.append("Upgrades", Upgrades);
    formData.append("totalMoney", TotalMoneyEarned);

    try {
      const response = await fetch(`/saveStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      const data = await response.json();
    } catch (error) {
      console.log("FUCKED");
    }
  }
}

//To explain why the fetch function looks like that, in the server.js the middleware being used is bodyparser, as apposed to json
//Because of that the data needs to be transfered in the beautiful way shown below. Do i know how it works? like 50% of it

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  // Return a string that serves as the warning message in some browsers
  return "Are you sure you want to leave this page?";
});

async function getStats() {
  UserID = sessionStorage.getItem("userID");
  try {
    // Send a request to the server endpoint
    const response = await fetch(`/getStats?UserID=${UserID}`);
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    userName = data.name;
    Upgrades = JSON.stringify(data.upgrades);
    currency = data.money;
    TotalMoneyEarned = data.totalMoney;
  } catch (error) {
    console.log("FUCKED");
  }
}

var SoundCheckbox = document.getElementById("SoundEffectsCheckbox");
var LevelUpCheckBox = document.getElementById("LevelUpAlert");

document.addEventListener("DOMContentLoaded", () => {
  const SoundCheckBoxState = localStorage.getItem("SoundCheckboxState");
  const LevelCheckBoxState = localStorage.getItem("LevelCheckboxState");
  if (SoundCheckBoxState === "checked") {
    SoundCheckbox.checked = true;
  }
  if (LevelCheckBoxState === "checked") {
    LevelUpCheckBox.checked = true;
  }
});

SoundCheckbox.addEventListener("change", () => {
  if (SoundCheckbox.checked) {
    localStorage.setItem("SoundCheckboxState", "checked");
  } else {
    localStorage.setItem("SoundCheckboxState", "unchecked");
  }
});
LevelUpCheckBox.addEventListener("change", () => {
  if (LevelUpCheckBox.checked) {
    localStorage.setItem("LevelCheckboxState", "checked");
  } else {
    localStorage.setItem("LevelCheckboxState", "unchecked");
  }
});
//this is voodoo
//to get around the stupid button not saving it's state!

//Future idea for future me, make div 1 maybe an information tab, or the updates tab like previously discussed!

//make currently logged in as
