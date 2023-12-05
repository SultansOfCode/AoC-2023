const { readlines } = require("../utils");

const partTwo = true;

const ballsLimits = {
  red: 12,
  green: 13,
  blue: 14
};

const processLinePartOne = line => {
  const firstSplit = line.split(":");
  const gameNumber = parseInt(firstSplit[0].split(" ")[1]);
  const gamesPlayed = firstSplit[1].trim().split(";");

  for(const gamePlayed of gamesPlayed) {
    const ballsTaken = gamePlayed.split(",").map(token => token.trim());

    for(const ballTaken of ballsTaken) {
      const tokens = ballTaken.split(" ");
      const quantity = parseInt(tokens[0]);
      const color = tokens[1];

      if(ballsLimits[color] < quantity) {
        return 0;
      }
    }
  }

  return gameNumber;
};

const processLinePartTwo = line => {
  const minimums = {
    red: 0,
    green: 0,
    blue: 0
  };

  const gamesPlayed = line.split(":")[1].trim().split(";");

  for(const gamePlayed of gamesPlayed) {
    const ballsTaken = gamePlayed.split(",").map(token => token.trim());

    for(const ballTaken of ballsTaken) {
      const tokens = ballTaken.split(" ");
      const quantity = parseInt(tokens[0]);
      const color = tokens[1];

      if(minimums[color] < quantity) {
        minimums[color] = quantity;
      }
    }
  }

  return minimums.red * minimums.green * minimums.blue;
};

let sum = 0;

for(let line of readlines("input.txt")) {
  if(partTwo) {
    sum += processLinePartTwo(line);
  }
  else {
    sum += processLinePartOne(line);
  }
}

console.log(sum);
