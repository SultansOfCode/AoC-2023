const { readlinesUntilEmpty } = require("../utils");

const partTwo = false;

const checkRowReflection = lines => {
  const newLines = [...lines];

  newLines.shift();

  const middle = newLines.length / 2;

  let i = middle - 1;
  let j = i + 1;

  while(i >= 0 && j < newLines.length) {
    const line1 = newLines[i];
    const line2 = newLines[j];

    if(line1 !== line2) {
      return 0;
    }

    --i;
    ++j;
  }

  return middle + 1;
};

const checkColReflection = lines => {
  const newLines = [];

  for(let i = 0; i < lines[0].length; ++i) {
    const newLine = [];

    for(const line of lines) {
      newLine.push(line[i]);
    }

    newLines.push(newLine.join(""));
  }

  return checkRowReflection(newLines);
};

const checkAllReflections = lines => {
  const rowReflection = checkRowReflection(lines);
  const colReflection = checkColReflection(lines);

  return colReflection + rowReflection * 100;
};

let sum = 0;

for(const lines of readlinesUntilEmpty("input.txt")) {
  sum += checkAllReflections(lines);
}

console.log(sum);
