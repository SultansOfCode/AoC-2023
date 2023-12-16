const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const lines = readlinesUntilEmpty("input.txt").next().value.map(line => line.split("").map(char => ({ char })));

const resetCells = () => {
  for(const line of lines) {
    for(const cell of line) {
      cell.energized = false;

      const { char } = cell;

      if(char === "/") {
        cell.hitFromTL = false;
        cell.hitFromBR = false;
      }
      else if(char === "\\") {
        cell.hitFromTR = false;
        cell.hitFromBL = false;
      }
      else if(char === "-") {
        cell.hitFromTB = false;
        cell.hitFromLR = false;
      }
      else if(char === "|") {
        cell.hitFromLR = false;
        cell.hitFromTB = false;
      }
    }
  }
};

let walkers = [];

const createWalker = (x, y, dx, dy) => {
  const newWalker = {
    x,
    y,
    dx,
    dy,
    finished: false
  };

  walkers.push(newWalker);
};

const allWalkersFinished = () => {
  for(const walker of walkers) {
    if(walker.finished) {
      continue;
    }

    return false;
  }

  return true;
};

const doWalk = walker => {
  walker.x += walker.dx;
  walker.y += walker.dy;

  if(walker.x < 0 || walker.y < 0) {
    walker.finished = true;

    return;
  }

  if(walker.x >= lines[0].length || walker.y >= lines.length) {
    walker.finished = true;

    return;
  }

  const cell = lines[walker.y][walker.x];

  if(!cell.energized) {
    cell.energized = true;
  }

  const { char } = cell;

  if(char === ".") {
    return;
  }

  if(char === "-") {
    // If coming horizontally
    if(walker.dx !== 0) {
      if(cell.hitFromLR) {
        walker.finished = true;
      }
      else {
        cell.hitFromLR = true;
      }

      return;
    }

    // Otherwise
    if(cell.hitFromTB) {
      walker.finished = true;

      return;
    }
    else {
      cell.hitFromTB = true;
    }

    walker.dx = -1;
    walker.dy = 0;

    createWalker(walker.x, walker.y, 1, 0);
  }

  if(char === "|") {
    // If coming vertically
    if(walker.dy !== 0) {
      if(cell.hitFromTB) {
        walker.finished = true;
      }
      else {
        cell.hitFromTB = true;
      }

      return;
    }

    // Otherwise
    if(cell.hitFromLR) {
      walker.finished = true;

      return;
    }
    else {
      cell.hitFromLR = true;
    }

    walker.dx = 0;
    walker.dy = -1;

    createWalker(walker.x, walker.y, 0, 1);
  }

  if(char === "/") {
    // If coming from left
    if(walker.dx === 1) {
      if(cell.hitFromTL === true) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromTL = true;
      }

      walker.dx = 0;
      walker.dy = -1;
    }
    // If comming from right
    else if(walker.dx === -1) {
      if(cell.hitFromBR === true) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromBR = true;
      }

      walker.dx = 0;
      walker.dy = 1;
    }
    // If coming from top
    else if(walker.dy === 1) {
      if(cell.hitFromTL === true) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromTL = true;
      }

      walker.dx = -1;
      walker.dy = 0;
    }
    // If coming from bottom
    else if(walker.dy === -1) {
      if(cell.hitFromBR === true) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromBR = true;
      }

      walker.dx = 1;
      walker.dy = 0;
    }
  }

  if(char === "\\") {
    // If coming from left
    if(walker.dx === 1) {
      if(cell.hitFromBL) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromBL = true;
      }

      walker.dx = 0;
      walker.dy = 1;
    }
    // If comming from right
    else if(walker.dx === -1) {
      if(cell.hitFromTR) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromTR = true;
      }

      walker.dx = 0;
      walker.dy = -1;
    }
    // If coming from top
    else if(walker.dy === 1) {
      if(cell.hitFromTR) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromTR = true;
      }

      walker.dx = 1;
      walker.dy = 0;
    }
    // If coming from bottom
    else if(walker.dy === -1) {
      if(cell.hitFromBL) {
        walker.finished = true;

        return;
      }
      else {
        cell.hitFromBL = true;
      }

      walker.dx = -1;
      walker.dy = 0;
    }
  }
};

const processWalkers = () => {
  while(!allWalkersFinished()) {
    for(const walker of walkers) {
      doWalk(walker);
    }

    walkers = walkers.filter(walker => !walker.finished);
  }
};

const countEnergizedCells = () => {
  let count = 0;

  for(const line of lines) {
    for(const cell of line) {
      if(!cell.energized) {
        continue;
      }

      ++count;
    }
  }

  return count;
};

if(partTwo) {
  let maxEnergizedCells = -Infinity;

  // Rows
  for(let i = 0; i < lines.length; ++i) {
    resetCells();

    walkers = [];

    createWalker(-1, i, 1, 0);

    processWalkers();

    let energizedCells = countEnergizedCells();

    if(energizedCells > maxEnergizedCells) {
      maxEnergizedCells = energizedCells;
    }

    resetCells();

    walkers = [];

    createWalker(lines[0].length, i, -1, 0);

    processWalkers();

    energizedCells = countEnergizedCells();

    if(energizedCells > maxEnergizedCells) {
      maxEnergizedCells = energizedCells;
    }
  }

  // Columns
  for(let i = 0; i < lines[0].length; ++i) {
    resetCells();

    walkers = [];

    createWalker(i, -1, 0, 1);

    processWalkers();

    let energizedCells = countEnergizedCells();

    if(energizedCells > maxEnergizedCells) {
      maxEnergizedCells = energizedCells;
    }

    resetCells();

    walkers = [];

    createWalker(i, lines.length, 0, -1);

    processWalkers();

    energizedCells = countEnergizedCells();

    if(energizedCells > maxEnergizedCells) {
      maxEnergizedCells = energizedCells;
    }
  }

  console.log(maxEnergizedCells);
}
else {
  resetCells();
  createWalker(-1, 0, 1, 0);

  processWalkers();

  const energizedCells = countEnergizedCells();

  console.log(energizedCells);
}
