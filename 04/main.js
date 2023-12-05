const { readFileSync } = require("fs");

const partTwo = true;

const processLinesPartOne = lines => {
  let sum = 0;

  for(let line of lines) {
    line = line.replace(/ {2,}/g, " ");

    const tokens = line.split(":")[1].trim().split("|");
    const winners = tokens[0].trim().split(" ");
    const playeds = tokens[1].trim().split(" ");

    let count = 0;

    for(const played of playeds) {
      if(!winners.includes(played)) {
        continue;
      }

      ++count;
    }

    if(count === 0) {
      continue;
    }

    sum += (1 << (count - 1));
  }

  return sum;
};

const processLinesPartTwo = lines => {
  const counts = {};

  for(let i = lines.length - 1; i >= 0; --i) {
    const line = lines[i].replace(/ {2,}/g, " ");
    
    const tokens = line.split(":");
    const cardNumber = parseInt(tokens[0].trim().split(" ")[1].trim());
    const gameTokens = tokens[1].trim().split("|");
    const winners = gameTokens[0].trim().split(" ");
    const playeds = gameTokens[1].trim().split(" ");

    let winCount = 0;

    for(const played of playeds) {
      if(!winners.includes(played)) {
        continue;
      }

      ++winCount;
    }

    counts[cardNumber] = winCount;

    if(winCount === 0) {
      continue;
    }

    for(let j = 1; j <= winCount; ++j) {
      counts[cardNumber] += counts[cardNumber + j];
    }
  }

  return Object.values(counts).reduce((a, c) => a + c) + Object.keys(counts).length;
};

const lines = readFileSync("input.txt").toString().split("\n");

if(partTwo) {
  console.log(processLinesPartTwo(lines));
}
else {
  console.log(processLinesPartOne(lines));
}
