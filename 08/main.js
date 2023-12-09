const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const linesReader = readlinesUntilEmpty("input.txt");

const steps = linesReader.next().value[0];
const lines = linesReader.next().value;

const locations = {};

for(let line of lines) {
  line = line.replace(/ /g, "").replace(/\(/g, "").replace(/\)/g, "");

  const [location, exitsToken] = line.split("=");
  const [exitL, exitR] = exitsToken.split(",");

  locations[location] = {
    "L": exitL,
    "R": exitR
  };
}

const findFirstFor = (quantity, start) => {
  let currentLocation = start;
  let i = 0;
  let found = 0;
  let lastI = 0;
  
  const stepsNeeded = [];

  // console.log(i, start, i);

  while(true) {
    const direction = steps[i % steps.length];
    const nextLocation = locations[currentLocation][direction];

    currentLocation = nextLocation;

    if(nextLocation.endsWith("Z")) {
      const stepsTaken = i - lastI;

      // console.log(i, nextLocation, stepsTaken);

      lastI = i;

      stepsNeeded.push(stepsTaken);

      ++found;

      if(found === quantity) {
        break;
      }
    }

    ++i;
  }

  // console.log("");

  return Math.max(...stepsNeeded);
};

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

if(partTwo) {
  const currentLocations = Object.keys(locations).filter(location => location.endsWith("A"));
  const maxsSteps = [];

  for(const currentLocation of currentLocations) {
    const maxSteps = findFirstFor(3, currentLocation);

    maxsSteps.push(maxSteps);
  }

  console.log(maxsSteps.reduce(lcm));

  // let i = 0;
  // let finished = false;
  // const timeStart = (new Date()).valueOf();

  // while(!finished) {
  //   finished = true;

  //   const direction = steps[i % steps.length];

  //   for(let j = 0; j < currentLocations.length; ++j) {
  //     const currentLocation = currentLocations[j];
  //     const nextLocation = locations[currentLocation][direction];

  //     currentLocations[j] = nextLocation;

  //     if(!nextLocation.endsWith("Z") && finished) {
  //       finished = false;
  //     }
  //   }

  //   const now = (new Date()).valueOf();
  //   const ellapsed = now - timeStart;

  //   if(ellapsed >= 1000) {
  //     console.log("1 SECOND:", ellapsed, i, i * currentLocations.length);
  //     break;
  //   }

  //   ++i;
  // }
}
else {
  let i = 0;
  let location = "AAA";

  while(location != "ZZZ") {
    location = locations[location][steps[i % steps.length]];

    ++i;
  }

  console.log(i);
}
