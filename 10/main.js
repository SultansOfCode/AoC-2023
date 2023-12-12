const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const lines = readlinesUntilEmpty("input.txt").next().value.map(line => line.split(""));

let s = null;

for(let i = 0; i < lines.length; ++i) {
  const line = lines[i];

  for(let j = 0; j < line.length; ++j) {
    const char = line[j];

    if(char !== "S") {
      continue;
    }

    s = {
      x: j,
      y: i
    };

    break;
  }

  if(s !== null) {
    break;
  }
}

const loopPositions = [
  `${s.x}-${s.y}`
];

const loopVertices = [];

const leftExits = ["-", "L", "F"]
const rightExits = ["-", "J", "7"];
const topExits = ["|", "7", "F"];
const bottomExits = ["|", "J", "L"];
const corners = ["L", "F", "J", "7"];

const walker1 = {
  x: s.x,
  y: s.y,
  steps: 0,
  dx: 0,
  dy: 0
};

const walker2 = {
  x: s.x,
  y: s.y,
  steps: 0,
  dx: 0,
  dy: 0
};

// Check left
if(s.x > 0 && leftExits.includes(lines[s.y][s.x - 1])) {
  if(walker1.dx === 0 && walker1.dy === 0) {
    walker1.dx = -1;
  }
  else {
    walker2.dx = -1;
  }
}

// Check right
if(s.x < lines[0].length - 1 && rightExits.includes(lines[s.y][s.x + 1])) {
  if(walker1.dx === 0 && walker1.dy === 0) {
    walker1.dx = 1;
  }
  else {
    walker2.dx = 1;
  }
}

// Check top
if(s.y > 0 && topExits.includes(lines[s.y - 1][s.x])) {
  if(walker1.dx === 0 && walker1.dy === 0) {
    walker1.dy = -1;
  }
  else {
    walker2.dy = -1;
  }
}

if(s.y < lines.length - 1 && bottomExits.includes(lines[s.y + 1][s.x])) {
  if(walker1.dx === 0 && walker1.dy === 0) {
    walker1.dy = 1;
  }
  else {
    walker2.dy = 1;
  }
}

const walkersMinDx = Math.min(walker1.dx, walker2.dx);
const walkersMaxDx = Math.max(walker1.dx, walker2.dx);
const walkersMinDy = Math.min(walker1.dy, walker2.dy);
const walkersMaxDy = Math.max(walker1.dy, walker2.dy);

let sReplace = "S";

if(walkersMinDx === -1 && walkersMaxDx === 1) {
  sReplace = "-";
}
else if(walkersMinDy === -1 && walkersMaxDy === 1) {
  sReplace = "|";
}
else if(walkersMinDx === -1 && walkersMinDy === -1) {
  sReplace = "J";
}
else if(walkersMinDx === -1 && walkersMaxDy === 1) {
  sReplace = "7";
}
else if(walkersMaxDx === 1 && walkersMinDy === -1) {
  sReplace = "L";
}
else if(walkersMaxDx === 1 && walkersMaxDy === 1) {
  sReplace = "F";
}

lines[s.y][s.x] = sReplace;

const samePosition = () => (walker1.steps > 0 && walker2.steps > 0 && walker1.x === walker2.x && walker1.y === walker2.y);

const processStep = walker => {
  walker.x += walker.dx;
  walker.y += walker.dy;

  const char = lines[walker.y][walker.x];

  if(char === "F") {
    // Check if came from right side
    if(walker.dx === -1) {
      walker.dx = 0;
      walker.dy = 1;
    }
    // Check if came from bottom side
    else if(walker.dy === -1) {
      walker.dx = 1;
      walker.dy = 0;
    }
  }
  else if(char === "L") {
    // Check if came from right side
    if(walker.dx === -1) {
      walker.dx = 0;
      walker.dy = -1;
    }
    // Check if came from top side
    else if(walker.dy === 1) {
      walker.dx = 1;
      walker.dy = 0;
    }
  }
  else if(char === "7") {
    // Check if came from left side
    if(walker.dx === 1) {
      walker.dx = 0;
      walker.dy = 1;
    }
    // Check if came from bottom side
    else if(walker.dy === -1) {
      walker.dx = -1;
      walker.dy = 0;
    }
  }
  else if(char === "J") {
    // Check if came from left side
    if(walker.dx === 1) {
      walker.dx = 0;
      walker.dy = -1;
    }
    // Check if came from top side
    else if(walker.dy === 1) {
      walker.dx = -1;
      walker.dy = 0;
    }
  }

  if(partTwo && corners.includes(char)) {
    loopVertices.push([walker.x, walker.y]);
  }

  ++walker.steps;
};

while(!samePosition()) {
  processStep(walker1);
  processStep(walker2);

  if(partTwo) {
    const position1 = `${walker1.x}-${walker1.y}`;
    const position2 = `${walker2.x}-${walker2.y}`;

    if(!loopPositions.includes(position1)) {
      loopPositions.push(position1);
    }

    if(!loopPositions.includes(position2)) {
      loopPositions.push(position2);
    }
  }
}

if(partTwo) {
  for(let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    for(let j = 0; j < line.length; ++j) {
      const position = `${j}-${i}`;

      if(!loopPositions.includes(position)) {
        line[j] = ".";
      }
    }
  }

  let enclosed = 0;

  for(let i = 0; i < lines.length; ++i) {
    const line = lines[i]
      .join("")
      .replace(/\|/g, "I")
      .replace(/F-*?7/g, "-")
      .replace(/L-*?J/g, "-")
      .replace(/L-*?7/g, "I")
      .replace(/F-*?J/g, "I");

    let inside = false;

    for(let j = 0; j < line.length; ++j) {
      const char = line[j];

      if(char === "I") {
        inside = !inside;

        continue;
      }

      if(char !== "." || !inside) {
        continue;
      }

      ++enclosed;
    }
  }

  console.log(enclosed);
}
else {
  console.log(walker1.steps);
}
