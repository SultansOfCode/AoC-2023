const { workerData, parentPort } = require("worker_threads");

const seedStart = workerData.seedStart;
const seedRange = workerData.seedRange;
const seedToSoil = workerData.seedToSoil;
const soilToFertilizer = workerData.soilToFertilizer;
const fertilizerToWater = workerData.fertilizerToWater;
const waterToLight = workerData.waterToLight;
const lightToTemperature = workerData.lightToTemperature;
const temperatureToHumidity = workerData.temperatureToHumidity;
const humidityToLocation = workerData.humidityToLocation;

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

let smallestLocation = Infinity;

for(let seed = seedStart; seed < seedStart + seedRange; ++seed) {
  const location = findSeedLocation(seed);

  if(location >= smallestLocation) {
    continue;
  }

  smallestLocation = location;
}

parentPort.postMessage(smallestLocation);
