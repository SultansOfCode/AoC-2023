const { readlines } = require("../utils");

const partTwo = true;

const fixTable = {
  "z0o": /zero/g,
  "o1e": /one/g,
  "t2o": /two/g,
  "t3e": /three/g,
  "f4r": /four/g,
  "f5e": /five/g,
  "s6x": /six/g,
  "s7n": /seven/g,
  "e8t": /eight/g,
  "n9e": /nine/g
};

const fixLine = line => {
  while(true) {
    const oldLine = line;

    for(const [digit, digitRegex] of Object.entries(fixTable)) {
      line = line.replace(digitRegex, digit);
    }

    if(line === oldLine) {
      break;
    }
  }

  return line;
};

const clearLine = text => text.replace(/[^0123456789]/g, "");

const processLine = line => parseInt(`${line[0]}${line[line.length - 1]}`);

let sum = 0;

for(let line of readlines("input.txt")) {
  if(partTwo) {
    line = fixLine(line);
  }

  line = clearLine(line);

  sum += processLine(line);
}

console.log(sum);
