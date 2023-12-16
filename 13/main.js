const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const desiredDistance = (partTwo ? 1 : 0);

const calculateDistance = (slice1, slice2) => {
  let distance = 0;
  let minLength = Math.min(slice1.length, slice2.length);

  for(let i = 0; i < minLength; ++i) {
    const line1 = slice1[i];
    const line2 = slice2[i];

    for(let j = 0; j < line1.length; ++j) {
      const char1 = line1[j];
      const char2 = line2[j];

      if(char1 === char2) {
        continue;
      }

      ++distance;
    }
  }

  return distance;
};

const checkRowReflection = lines => {
  for(let i = 1; i < lines.length; ++i) {
    const slice1 = lines.slice(0, i).reverse();
    const slice2 = lines.slice(-lines.length + i);

    const distance = calculateDistance(slice1, slice2);

    if(distance === desiredDistance) {
      return i;
    }
  }

  return 0;
};

const checkColReflection = lines => {
  const newLines = [];

  for(let i = 0; i < lines[0].length; ++i) {
    const newLine = [];

    for(const line of lines) {
      newLine.push(line[i]);
    }

    newLines.push(newLine);
  }

  return checkRowReflection(newLines);
};

const checkAllReflections = lines => {
  const rowReflection = checkRowReflection(lines);

  if(rowReflection > 0) {
    return rowReflection * 100;
  }

  const colReflection = checkColReflection(lines);

  return colReflection;
};

let sum = 0;

for(const lines of readlinesUntilEmpty("input.txt")) {
  sum += checkAllReflections(lines);
}

console.log(sum);
