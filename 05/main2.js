const { readlinesUntilEmpty } = require("../utils");
const { Worker } = require("worker_threads");

const partTwo = true;

const seeds = [];
const seedToSoil = [];
const soilToFertilizer = [];
const fertilizerToWater = [];
const waterToLight = [];
const lightToTemperature = [];
const temperatureToHumidity = [];
const humidityToLocation = [];

const createWorker = (seedStart, seedRange) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: {
        seedStart,
        seedRange,
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation
      }
    });

    worker.on("message", data => {
      resolve(data);
    });

    worker.on("error", error => {
      reject(`An error ocurred: ${error}`);
    });
  });
};

const fillMap = (map, lines) => {
  for(let i = 1; i < lines.length; ++i) {
    const line = lines[i];
    const values = line.split(" ").map(value => parseInt(value));
    const mapping = {
      dst: values[0],
      src: values[1],
      rng: values[2]
    };

    map.push(mapping);
  }
};

for(const lines of readlinesUntilEmpty("input.txt")) {
  const firstLine = lines[0];
  const firstWord = firstLine.split(" ")[0].split(":")[0];

  if(firstWord === "seeds") {
    seeds.push(...firstLine.split(":")[1].trim().split(" ").map(seed => parseInt(seed)));
  }
  else if(firstWord === "seed-to-soil") {
    fillMap(seedToSoil, lines);
  }
  else if(firstWord === "soil-to-fertilizer") {
    fillMap(soilToFertilizer, lines);
  }
  else if(firstWord === "fertilizer-to-water") {
    fillMap(fertilizerToWater, lines);
  }
  else if(firstWord === "water-to-light") {
    fillMap(waterToLight, lines);
  }
  else if(firstWord === "light-to-temperature") {
    fillMap(lightToTemperature, lines);
  }
  else if(firstWord === "temperature-to-humidity") {
    fillMap(temperatureToHumidity, lines);
  }
  else if(firstWord === "humidity-to-location") {
    fillMap(humidityToLocation, lines);
  }
}

const solvePartTwo = async () => {
  const workers = [];

  for(let i = 0; i < seeds.length / 2; ++i) {
    const index = i * 2;
    const seedStart = seeds[index];
    const seedRange = seeds[index + 1];
    
    workers.push(createWorker(seedStart, seedRange));
  }

  const results = await Promise.all(workers);
  const smallestLocation = Math.min(...results);

  console.log(smallestLocation);
};

if(partTwo) {
  solvePartTwo();
}
else {
  const locations = [];

  for(const seed of seeds) {
    const location = findSeedLocation(seed);

    locations.push(location);
  }

  console.log(locations, Math.min(...locations));
}
