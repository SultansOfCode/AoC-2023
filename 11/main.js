const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const lines = readlinesUntilEmpty("/Users/streamer/Projects/aoc2023/11/input.txt").next().value;

const galaxies = [];
const expandedRows = [];
const expandedCols = [];

// Less 1 because the original space was already counted
const expansionRate = (partTwo ? 1000000 : 2) - 1;

for(let i = 0; i < lines.length; ++i) {
  const line = lines[i];

  let allSpaces = true;

  for(let j = 0; j < line.length; ++j) {
    const char = line[j];

    if(char === ".") {
      continue;
    }

    if(char === "#") {
      galaxies.push([j, i]);

      if(allSpaces) {
        allSpaces = false;
      }
    }
  }

  if(allSpaces) {
    expandedRows.push(i);
  }
}

for(let i = 0; i < lines[0].length; ++i) {
  let allSpaces = true;

  for(const line of lines) {
    const char = line[i];

    if(char === "#" && allSpaces) {
      allSpaces = false;

      break;
    }
  }

  if(allSpaces) {
    expandedCols.push(i);
  }
}

let sum = 0;

for(let i = 0; i < galaxies.length - 1; ++i) {
  const galaxy1 = galaxies[i];

  for(let j = i + 1; j < galaxies.length; ++j) {
    const galaxy2 = galaxies[j];

    const minX = Math.min(galaxy1[0], galaxy2[0]);
    const maxX = Math.max(galaxy1[0], galaxy2[0]);
    const minY = Math.min(galaxy1[1], galaxy2[1]);
    const maxY = Math.max(galaxy1[1], galaxy2[1]);

    sum += (maxX - minX) + (maxY - minY) + expandedRows.filter(row => row > minY && row < maxY).length * expansionRate + expandedCols.filter(col => col > minX && col < maxX).length * expansionRate;
  }
}

console.log(sum);
