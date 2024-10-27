// 1.deposit some money
//2. determine number of lines to bet on
//3.get amount from the user
//4,spin the slot
//5. check if the user won
//6. give amount if won otherwise decline
//7. display
//8. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositrAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositrAmount) || numberDepositrAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return numberDepositrAmount;
    }
  }
};

const getNumberofLines = () => {
  while (true) {
    const numofLines = prompt("Enter number of line you want to bet on: ");
    const lines = parseFloat(numofLines);
    if (lines < 1 || isNaN(lines) || lines > 3) {
      console.log("Invalid number of lines ,try again");
    } else {
      return lines;
    }
  }
};

const getBet = (numberDepositrAmount) => {
  while (true) {
    const bet = prompt("Enter the total bet: ");
    const numberbet = parseFloat(bet);

    if (
      isNaN(numberbet) ||
      numberbet <= 0 ||
      numberbet > numberDepositrAmount / lines
    ) {
      console.log("Invalid bet , please Try Again");
    } else {
      return numberbet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let j = 0; j < COLS; j++) {
    rows[j] = [];
    for (let i = 0; i < ROWS; i++) {
      rows[j].push(reels[i][j]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += "|";
      }
    }
    console.log(rowString);
  }
};

const getWinings = (rows) => {
  let winings = 0;
  for (const row of rows) {
    if (row[0] === row[1] && row[0] === row[2]) {
      console.log("Congratulations");
    } else {
      console.log("no sorry");
    }
  }
};

const reels = spin();
console.log(reels);

let numberDepositrAmount = deposit();
console.log(numberDepositrAmount);

const lines = getNumberofLines();
console.log(lines);

const bet = getBet(numberDepositrAmount);
console.log(bet);

const rows = transpose(reels);
console.log(reels);
console.log(rows);

printRows(rows);

getWinings(rows);
