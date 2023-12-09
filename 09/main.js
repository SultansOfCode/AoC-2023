const { readlines } = require("../utils");

const partTwo = true;

let sum = 0;

for(const line of readlines("input.txt")) {
  const history = line.split(" ").map(entry => parseInt(entry));
  const sequences = [history];

  let finished = false;

  while(!finished) {
    finished = true;

    const lastSequence = sequences[sequences.length - 1];
    const nextSequence = [];

    for(let i = 0; i < lastSequence.length - 1; ++i) {
      const difference = lastSequence[i + 1] - lastSequence[i];

      nextSequence.push(difference);

      if(difference !== 0 && finished) {
        finished = false;
      }
    }

    sequences.push(nextSequence);
  }

  for(let i = sequences.length - 3; i >= 0; --i) {
    const currentSequence = sequences[i];
    const nextSequence = sequences[i + 1];

    if(partTwo) {
      const newValue = currentSequence[0] - nextSequence[0];

      currentSequence.unshift(newValue);
    }
    else {
      const newValue = currentSequence[currentSequence.length - 1] + nextSequence[nextSequence.length - 1];

      currentSequence.push(newValue);
    }
  }

  if(partTwo) {
    sum += sequences[0].shift();
  }
  else {
    sum += sequences[0].pop();
  }
}

console.log(sum);
