const { readlinesUntilEmpty } = require("../utils");
const { createHash } = require("crypto");

const partTwo = true;

const lines = readlinesUntilEmpty("input.txt").next().value.map(line => line.split(""));

const tiltToNorth = () => {
  for(let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    for(let j = 0; j < line.length; ++j) {
      const char = line[j];

      if(char !== "O") {
        continue;
      }

      let k = i - 1;

      if(k >= 0 && lines[k][j] === ".") {
        while(k >= 0 && lines[k][j] === ".") {
          --k;
        }

        ++k;

        lines[k][j] = "O";

        lines[i][j] = ".";
      }
    }
  }
};

const tiltToWest = () => {
  for(let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    for(let j = 0; j < line.length; ++j) {
      const char = line[j];

      if(char !== "O") {
        continue;
      }

      let k = j - 1;

      if(k >= 0 && lines[i][k] === ".") {
        while(k >= 0 && lines[i][k] === ".") {
          --k;
        }

        ++k;

        lines[i][k] = "O";

        lines[i][j] = ".";
      }
    }
  }
};

const tiltToSouth = () => {
  for(let i = lines.length - 1; i >= 0; --i) {
    const line = lines[i];

    for(let j = 0; j < line.length; ++j) {
      const char = line[j];

      if(char !== "O") {
        continue;
      }

      let k = i + 1;

      if(k < lines.length && lines[k][j] === ".") {
        while(k < lines.length && lines[k][j] === ".") {
          ++k;
        }

        --k;

        lines[k][j] = "O";

        lines[i][j] = ".";
      }
    }
  }
};

const tiltToEast = () => {
  for(let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    for(let j = line.length - 1; j >= 0; --j) {
      const char = line[j];

      if(char !== "O") {
        continue;
      }

      let k = j + 1;

      if(k < line.length && lines[i][k] === ".") {
        while(k < line.length && lines[i][k] === ".") {
          ++k;
        }

        --k;

        lines[i][k] = "O";

        lines[i][j] = ".";
      }
    }
  }
};

const cycle = () => {
  tiltToNorth();

  if(partTwo) {
    tiltToWest();
    tiltToSouth();
    tiltToEast();
  }
};

const cycles = (partTwo ? 1000000000 : 1);
const md5s = [];
let cycleFound = false;

for(let i = 0; i < cycles; ++i) {
  cycle();

  if(!partTwo) {
    continue;
  }

  if(cycleFound) {
    continue;
  }

  const text = lines.flat().join("");
  const md5 = createHash("md5").update(text).digest("hex");
  const md5Index = md5s.indexOf(md5);

  if(md5Index === -1) {
    md5s.push(md5);

    continue;
  }

  cycleFound = true;

  const difference = md5s.length - md5Index;

  while(i < cycles) {
    i += difference;
  }

  i -= difference;
}

let sum = 0;

for(let i = 0; i < lines.length; ++i) {
  const line = lines[i];

  for(let j = 0; j < line.length; ++j) {
    const char = line[j];

    if(char !== "O") {
      continue;
    }

    sum += lines.length - i;
  }
}

console.log(sum);
