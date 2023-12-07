const { readFileSync } = require("fs");

const partTwo = true;

const solveFor = (time, distance) => {
  const delta = (time * time) - (4 * -1 * -distance);
  const deltaRoot = Math.sqrt(delta);

  const r1 = (-time + deltaRoot) / -2;
  const r2 = (-time - deltaRoot) / -2;

  const minTime = Math.floor(Math.min(r1, r2) + 1);
  const maxTime = Math.ceil(Math.max(r1, r2) - 1);

  const result = maxTime - minTime + 1;

  return result;
};

let times = [];
let distances = [];

const linesToProcess = readFileSync("input.txt").toString().split("\n");

if(partTwo) {
  times.push(parseInt(linesToProcess[0].replace(/ /g, "").split(":")[1]));
  distances.push(parseInt(linesToProcess[1].replace(/ /g, "").split(":")[1]));
}
else {
  times = linesToProcess[0].split(" ").map(time => parseInt(time)).filter(time => !isNaN(time));
  distances = linesToProcess[1].split(" ").map(distance => parseInt(distance)).filter(distance => !isNaN(distance));
}

let multiple = 1;

for(let i = 0; i < times.length; ++i) {
  const time = times[i];
  const distance = distances[i];

  multiple *= solveFor(time, distance);
}

console.log(multiple);
