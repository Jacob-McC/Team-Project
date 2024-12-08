//This exists cause of the awful math that works for the level calculating system
//Suffering from my own creation

var TotalMoneyEarned = 1;

var NextLevel = Math.trunc(
  (TotalMoneyEarned / Math.pow(10, Math.ceil(Math.log10(TotalMoneyEarned)))) *
    100
);

var Level = 5;

var NextLevel = "1" + "0".repeat(Level);

console.log(NextLevel);

//Easier version
