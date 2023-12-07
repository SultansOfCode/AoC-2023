const { readlines } = require("../utils");

const partTwo = true;

const cardValues = {
  "A": 13,
  "K": 12,
  "Q": 11,
  "J": 10,
  "T": 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1
};

if(partTwo) {
  cardValues["J"] = 0;
}

const handValues = {
  "five of a kind": 6,
  "four of a kind": 5,
  "full house": 4,
  "three of a kind": 3,
  "two pair": 2,
  "one pair": 1,
  "high card": 0
};

const handTypesPartOne = [
  ["five of a kind", /(.)\1\1\1\1/g],
  ["four of a kind", /(.)\1\1\1.|.(.)\2\2\2/g],
  ["full house", /(.)\1\1(.)\2|(.)\3(.)\4\4/g],
  ["three of a kind", /(.)\1\1..|.(.)\2\2.|..(.)\3\3/g],
  ["two pair", /(.)\1(.)\2.|(.)\3.(.)\4|.(.)\5(.)\6/g],
  ["one pair", /(.)\1...|.(.)\2..|..(.)\3.|...(.)\4/g],
  ["high card", /...../g]
];

const handTypesPartTwo = [
  ["five of a kind", /(.)\1\1\1\1|/g],
  ["four of a kind", /(.)\1\1\1|.(.)\2\2\2/g],
  ["full house", /(.)\1\1(.)\2|(.)\3(.)\4\4/g],
  ["three of a kind", /(.)\1\1|.(.)\2\2|..(.)\3\3/g],
  ["two pair", /(.)\1(.)\2|(.)\3.(.)\4|.(.)\5(.)\6/g],
  ["one pair", /(.)\1|.(.)\2|..(.)\3|...(.)\4/g],
  ["high card", /.{1,5}/g]
];

const handTypes = (partTwo ? handTypesPartTwo : handTypesPartOne);

const classifyHand = hand => {
  const target = (partTwo ? hand.withoutJokers : hand.sorted);

  for(const handType of handTypes) {
    const [name, regex] = handType;

    regex.lastIndex = 0;

    if(!regex.test(target)) {
      continue;
    }

    hand.type = name;

    break;
  }

  if(partTwo) {
    if(hand.jokers === 5 || hand.jokers === 4) {
      hand.type = "five of a kind";
    }
    else if(hand.jokers === 3) {
      if(hand.type === "one pair") {
        hand.type = "five of a kind";
      }
      else if(hand.type === "high card") {
        hand.type = "four of a kind"
      }
    }
    else if(hand.jokers === 2) {
      if(hand.type === "three of a kind") {
        hand.type = "five of a kind";
      }
      else if(hand.type === "one pair") {
        hand.type = "four of a kind";
      }
      else if(hand.type === "high card") {
        hand.type = "three of a kind";
      }
    }
    else if(hand.jokers === 1) {
      if(hand.type === "four of a kind") {
        hand.type = "five of a kind";
      }
      else if(hand.type === "three of a kind") {
        hand.type = "four of a kind";
      }
      else if(hand.type === "two pair") {
        hand.type = "full house";
      }
      else if(hand.type === "one pair") {
        hand.type = "three of a kind";
      }
      else if(hand.type === "high card") {
        hand.type = "one pair";
      }
    }
  }

  hand.value = handValues[hand.type];
};

const compareHands = (handA, handB) => {
  if(handA.value !== handB.value) {
    return (handA.value > handB.value ? -1 : 1);
  }

  let i = 0;

  while(handA.original[i] === handB.original[i]) {
    ++i;
  }

  if(i >= 5) {
    return 0;
  }

  const handAValue = cardValues[handA.original[i]];
  const handBValue = cardValues[handB.original[i]];

  return (handAValue > handBValue ? -1 : 1);
};

const hands = [];

for(const line of readlines("input.txt")) {
  const tokens = line.split(" ");
  const cardsSorted = tokens[0].split("").sort().join("");

  const hand = {
    original: tokens[0],
    sorted: cardsSorted,
    jokers: tokens[0].split("").filter(card => card === "J").length,
    withoutJokers: cardsSorted.replace(/J/g, ""),
    type: "unknown",
    value: -1,
    bid: parseInt(tokens[1])
  };

  classifyHand(hand);

  hands.push(hand);
}

hands.sort(compareHands);

let sum = 0;

for(let i = 0; i < hands.length; ++i) {
  const hand = hands[i];

  sum += hand.bid * (hands.length - i);
}

console.log(sum);
