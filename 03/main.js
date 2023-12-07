const partTwo = true;

const processLinesPartOne = lines => {
  const parts = [];
  const numbers = /\d+/g;
  const specialChars = /[^.\d]/g;

  for(let i = 0; i < lines.length; ++i) {
    const currentLine = lines[i];

    let result;

    while((result = numbers.exec(currentLine)) !== null) {
      let found = false;
      const number = result[0];
      const index = result.index;
      const start = (index > 0 ? index - 1 : 0);
      const end = index + number.length + 1;
      
      if(i > 0) {
        const topLine = lines[i - 1];
        const substr = topLine.substring(start, end);
        const matches = substr.match(specialChars);

        if(matches) {
          found = true;
        }
      }

      const substr = currentLine.substring(start, end);
      const matches = substr.match(specialChars);

      if(matches) {
        found = true;
      }

      if(i < lines.length - 1) {
        const bottomLine = lines[i + 1];
        const substr = bottomLine.substring(start, end);
        const matches = substr.match(specialChars);

        if(matches) {
          found = true;
        }
      }

      if(found) {
        parts.push(parseInt(number));
      }
    }
  }

  return parts;
};

const processLinesPartTwo = lines => {
  const engines = {};
  const numbers = /\d+/g;
  const engineChars = /\*/g;
  const powers = [];

  const handleEngines = (lineNumber, start, end, number) => {
    const line = lines[lineNumber];
    let result;

    while((result = engineChars.exec(line)) !== null) {
      if(result.index < start || result.index > end) {
        continue;
      }

      const key = `${lineNumber}-${result.index}`;

      if(!Object.prototype.hasOwnProperty.call(engines, key)) {
        engines[key] = [];
      }

      engines[key].push(parseInt(number));
    }
  };

  for(let i = 0; i < lines.length; ++i) {
    const currentLine = lines[i];

    let result;

    while((result = numbers.exec(currentLine)) !== null) {
      const number = result[0];
      const index = result.index;
      const start = (index > 0 ? index - 1 : 0);
      const end = index + number.length;

      if(i > 0) {
        handleEngines(i - 1, start, end, number);
      }

      handleEngines(i, start, end, number);

      if(i < lines.length - 1) {
        handleEngines(i + 1, start, end, number);
      }
    }
  }

  for(const partNumbers of Object.values(engines)) {
    if(partNumbers.length !== 2) {
      continue;
    }

    const power = partNumbers[0] * partNumbers[1];

    powers.push(power);
  }

  return powers;
};

const { readFileSync } = require("fs");

const linesToProcess = readFileSync("input.txt").toString().split("\n");

if(partTwo) {
  const powers = processLinesPartTwo(linesToProcess);

  console.log(powers.reduce((a, c) => a + c));
}
else {
  const partNumbers = processLinesPartOne(linesToProcess);

  console.log(partNumbers.reduce((a, c) => a + c));
}
