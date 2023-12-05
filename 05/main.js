const { readlinesUntilEmpty } = require("../utils");

const partTwo = true;

const seeds = [];
const seedToSoil = [];
const soilToFertilizer = [];
const fertilizerToWater = [];
const waterToLight = [];
const lightToTemperature = [];
const temperatureToHumidity = [];
const humidityToLocation = [];

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

const findMap = (value, map) => {
  for(const mapping of map) {
    if(value < mapping.src || value > mapping.src + mapping.rng - 1) {
      continue;
    }

    return mapping.dst + (value - mapping.src);
  }

  return value;
};

const findSeedLocation = seed => {
  const soil = findMap(seed, seedToSoil);
  const fertilizer = findMap(soil, soilToFertilizer);
  const water = findMap(fertilizer, fertilizerToWater);
  const light = findMap(water, waterToLight);
  const temperature = findMap(light, lightToTemperature);
  const humidity = findMap(temperature, temperatureToHumidity);
  const location = findMap(humidity, humidityToLocation);

  return location;
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

if(partTwo) {
  let smallestLocation = Infinity;

  for(let i = 0; i < seeds.length / 2; ++i) {
    const index = i * 2;
    console.log(index, "/", seeds.length / 2);

    for(let seed = seeds[index]; seed < seeds[index] + seeds[index + 1]; ++seed) {
      const location = findSeedLocation(seed);

      if(location < smallestLocation) {
        smallestLocation = location;
      }
    }
  }

  console.log(smallestLocation);
}
else {
  const locations = [];

  for(const seed of seeds) {
    const location = findSeedLocation(seed);

    locations.push(location);
  }

  console.log(locations, Math.min(...locations));
}
