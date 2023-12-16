const { readlines } = require("../utils");

const partTwo = true;

const createPattern = groups => {
  const parts = [];

  for(const group of groups) {
    parts.push("".padStart(group, "#"));
  }

  const string = parts.join("\\.+");

  return RegExp(string);
};

const countArrangements = (springs, pattern, totalDamaged, index) => {
  if(index >= springs.length) {
    pattern.lastIndex = 0;

    if(!pattern.test(springs.join(""))) {
      // console.log(springs.join(""), pattern, false);
      return 0;
    }

    const damaged = springs.filter(spring => spring === "#").length;

    if(damaged !== totalDamaged) {
      // console.log(springs.join(""), pattern, false);
      return 0;
    }
    
    // console.log(springs.join(""), pattern, true);

    return 1;
  }

  let count = 0;

  const char = springs[index];

  if(char !== "?") {
    count += countArrangements(springs, pattern, totalDamaged, index + 1);
  }
  else {
    for(const springTry of [".", "#"]) {
      springs[index] = springTry;

      count += countArrangements(springs, pattern, totalDamaged, index + 1);
    }

    springs[index] = "?";
  }

  return count;
};

let sum = 0;
let minCount = Infinity;
let maxCount = -Infinity;

for(const line of readlines("input.txt")) {
  let [springs, groups] = line.split(" ");

  if(partTwo) {
    const expandedSprings = [];
    const expandedGroups = [];

    for(let i = 0; i < 5; ++i) {
      expandedSprings.push(springs);
      expandedGroups.push(groups);
    }

    springs = expandedSprings.join("?");
    groups = expandedGroups.join(",");
  }

  springs = springs.split("");
  groups = groups.split(",").map(group => parseInt(group));

  const count = springs.filter(spring => spring === "?").length;

  if(count < minCount) {
    minCount = count;
  }

  if(count > maxCount) {
    maxCount = count;
  }
  const totalDamaged = groups.reduce((a, c) => a + c);
  const pattern = createPattern(groups);
  console.log("GOING FOR:\n", springs.join(""), groups, pattern);
  // const arrangements = countArrangements(springs, pattern, totalDamaged, 0);

  // sum += arrangements;
  // console.log(springs.join(""), groups, pattern, arrangements);
}

console.log(sum, minCount, maxCount);
