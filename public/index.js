//I love putting all this code in one function, can't wait to see what it looks like at the end lol

var Upgrades;
var money = 0;

window.addEventListener("load", async function () {
  await getStats();
  var UpgradesArray = Upgrades.split("-");
  console.log(UpgradesArray);

  console.log("Upgrades " + Upgrades);
  var clickerButton = this.document.getElementsByName("clickerButton")[0]; //The clicker button
  var upgradeButton = this.document.getElementsByClassName("upgradeButton"); //The upgrade buttons
  var upgradeCost = this.document.getElementsByClassName("upgradeCost"); //The cost of each upgrade
  var upgradeName = this.document.getElementsByClassName("upgradeName"); //The name of each upgrade
  var upgradeIncome = this.document.getElementsByClassName("upgradeIncome"); //The rate of income for each upgrade
  var currencyText = this.document.getElementsByName("currency")[0]; //The text for the user's currency
  var currency = parseInt(currencyText.textContent.substring(1));
  var upgradeOwned = [...Array(upgradeButton.length).fill(0)]; //The amount of each upgrade the user owns
  var totalRateOfIncome = 0; //The rate of income of every upgrade added up
  var clickScale = 1; //For if any of the upgrades increase money per click

  console.log("Page Loaded Successfully");
  console.log(upgradeOwned);

  clickerButton.addEventListener("click", function () {
    //When clicker is clicked it will put money up
    currency++;
    console.log("Currency: " + currency);
    currencyText.textContent = "$ " + currency;
    console.log(
      "The button has been clicked!!! We are now at: " + currency + " Clicks!"
    );
  });

  for (let i = 0; i < upgradeButton.length; i++) {
    upgradeButton[i].addEventListener("click", function () {
      console.log("This upgrade costs: " + upgradeCost[i].textContent);
      if (parseInt(currency) >= upgradeCost[i].textContent) {
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

  function changeCurrency(currency) {
    if (currency >= 0) {
      currencyText.textContent = "$ " + currency;
    } else {
      console.log("Can't put currency below 0");
      return;
    }
  }

  function passiveIncome() {
    console.log("Current Currency is: " + currency);
    currency += totalRateOfIncome / 10;
    changeCurrency(currency);
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
