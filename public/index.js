//I love putting all this code in one function, can't wait to see what it looks like at the end lol

var Upgrades;
var money = 0;

window.addEventListener("load", async function () {
  await getStats();
  var UpgradesArray = Upgrades.split("-");
  console.log(UpgradesArray);
  var TotalMoneyEarned = 0;
  console.log("Upgrades " + Upgrades);
  var clickerButton = this.document.getElementsByName("clickerButton")[0]; //The clicker button
  var upgradeButton = this.document.getElementsByClassName("upgradeButton"); //The upgrade buttons
  var upgradeCost = this.document.getElementsByClassName("upgradeCost"); //The cost of each upgrade
  var upgradeName = this.document.getElementsByClassName("upgradeName"); //The name of each upgrade
  var upgradeIncome = this.document.getElementsByClassName("upgradeIncome"); //The rate of income for each upgrade
  var currencyText = this.document.getElementsByName("currency")[0]; //The text for the user's currency
  var incomeText = this.document.getElementsByName("income")[0]; //The text for the user's current income
  var currency = parseInt(currencyText.textContent.substring(1));
  var upgradeOwned = [...Array(upgradeButton.length).fill(0)]; //The amount of each upgrade the user owns
  var totalRateOfIncome = 0; //The rate of income of every upgrade added up
  var clickScale = 1; //For if any of the upgrades increase money per click
  var LevelCounter = this.document.getElementById("CurLevel");
  var LevelPercent = this.document.getElementById("LevelPercent");
  var LevelProgressBar = this.document.getElementById("Level");
  var ClickSound = new Audio("/sounds/clicksound.wav");
  var UpgradeSound = new Audio("/sounds/upgradesound.wav");
  var SoundEffectsONOFF = this.document.getElementById("SoundEffectsCheckbox");

  console.log("Page Loaded Successfully");
  console.log(upgradeOwned);

  clickerButton.addEventListener("click", function () {
    //When clicker is clicked it will put money up
    if ((SoundEffectsONOFF.checked = true)) {
      ClickSound.play();
    }
    currency++;
    TotalMoneyEarned++;
    console.log("Total: " + TotalMoneyEarned);
    console.log("Currency: " + currency);
    currencyText.textContent = "$ " + currency;
    console.log(
      "The button has been clicked!!! We are now at: " + currency + " Clicks!"
    );
    ClickSound.currentTime = 0;
  });

  for (let i = 0; i < upgradeButton.length; i++) {
    upgradeButton[i].addEventListener("click", function () {
      console.log("This upgrade costs: " + upgradeCost[i].textContent);
      if (parseInt(currency) >= upgradeCost[i].textContent) {
        UpgradeSound.play();
        UpgradeSound.currentTime = 0;
        currency = currency - upgradeCost[i].textContent;
        changeCurrency(currency);
        upgradeOwned[i]++;
        upgradeName[i].textContent =
          "Upgrade " + (i + 1) + " (" + upgradeOwned[i] + ")";
        console.log("Upgrade Bought!");

        totalRateOfIncome = 0;
        for (let i = 0; i < upgradeIncome.length; i++) {
          totalRateOfIncome += upgradeOwned[i] * upgradeIncome[i].textContent;
        }
        console.log("Total rate of Income is: " + totalRateOfIncome);
        changeIncomeText(totalRateOfIncome);
        scaleUpgradeCost(upgradeCost[i].textContent, upgradeOwned[i], i)
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

  function calculateLevel(TotalMoneyEarned) {
    var Level = TotalMoneyEarned.toString().length - 1;
    if (TotalMoneyEarned > 0) {
      var NextLevel = Math.trunc(
        (TotalMoneyEarned /
          Math.pow(10, Math.ceil(Math.log10(TotalMoneyEarned)))) *
          100
      );
    } else {
      var NextLevel = 0;
    }
    console.log("Next Level: " + NextLevel);
    console.log("Level:" + Level);
    LevelCounter.textContent = "Current Level: " + Level.toString();
    LevelPercent.textContent = NextLevel + "%";
    LevelProgressBar.value = NextLevel;
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
    calculateLevel(TotalMoneyEarned);
    changeCurrency(currency);
  }

  function scaleUpgradeCost(currentCost, upgradesOwned, i) {
    console.log("currentCost = " + currentCost);
    console.log("upgradesOwned = " + (upgradesOwned));
    console.log("Idk what's going on: " + ((10 * (upgradesOwned))**2));
    newCost = Math.trunc(currentCost * (1.15**upgradesOwned));
    console.log("New cost is now " + newCost + " and now causing inflation lol.");
    upgradeCost[i].textContent = newCost;

  }
});

//Modal stuff

var modal = document.getElementById("Modal");
var span = document.getElementsByClassName("close")[0];

function SettingsClick() {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Modal stuff

//To explain why the fetch function looks like that, in the server.js the middleware being used is bodyparser, as apposed to json
//Because of that the data needs to be transfered in the beautiful way shown below. Do i know how it works? like 50% of it

async function SaveClick() {
  alert("Save button is working");
  const formData = new URLSearchParams();
  UserID = "1";
  //THIS IS TEMP

  formData.append("userID", UserID);
  formData.append("money", money);
  formData.append("Upgrades", Upgrades);
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

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  // Return a string that serves as the warning message in some browsers
  return "Are you sure you want to leave this page?";
});

async function getStats() {
  UserID = "1";
  //THIS IS TEMP
  try {
    // Send a request to the server endpoint
    const response = await fetch(`/getStats?UserID=${UserID}`);
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    Upgrades = JSON.stringify(data.upgrades);
  } catch (error) {
    console.log("FUCKED");
  }
}
