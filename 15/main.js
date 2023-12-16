const { readFileSync } = require("fs");

const partTwo = true;

const inputs = readFileSync("input.txt").toString().split(",");

const hash = text => {
  let current = 0;

  for(let i = 0; i < text.length; ++i) {
    current += text.charCodeAt(i);
    current *= 17;
    current %= 256;
  }

  return current;
};

if(partTwo) {
  const boxes = {};

  for(const input of inputs) {
    let tokens;
    let shouldDelete = false;

    if(input.indexOf("-") > -1) {
      tokens = input.split("-");

      shouldDelete = true;
    }
    else if(input.indexOf("=") > -1) {
      tokens = input.split("=")
    }

    const [label, value] = tokens;
    const boxIndex = hash(label);

    if(!Object.prototype.hasOwnProperty.call(boxes, boxIndex)) {
      boxes[boxIndex] = [];
    }

    const box = boxes[boxIndex];
    const labelIndex = box.findIndex(element => element.key === label);

    if(shouldDelete) {
      if(labelIndex === -1) {
        continue;
      }

      box.splice(labelIndex, 1);
    }
    else {
      if(labelIndex > -1) {
        box[labelIndex].value = value;
      }
      else {
        const element = {
          key: label,
          value: value
        };

        box.push(element);
      }
    }
  }

  let sum = 0;

  for(let [boxIndex, box] of Object.entries(boxes)) {
    const boxIndexValue = parseInt(boxIndex) + 1;

    for(const [elementIndex, element] of box.entries()) {
      const elementIndexValue = elementIndex + 1;
      const value = boxIndexValue * elementIndexValue * element.value;

      sum += value;
    }
  }

  console.log(sum);
}
else {
  let sum = 0;

  for(const input of inputs) {
    sum += hash(input);
  }

  console.log(sum);
}
