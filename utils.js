const nReadlines = require("n-readlines");

function* readlines(filename) {
  const lines = new nReadlines(filename);
  let line;

  while(line = lines.next()) {
    yield line.toString("ascii");
  }

  return null;
}

function* readlinesUntilEmpty(filename) {
  const reader = new nReadlines(filename);
  let lines = [];

  while(line = reader.next()) {
    line = line.toString("ascii");

    if(line.length > 0) {
      lines.push(line);

      continue;
    }

    yield lines;

    lines = [];
  }

  yield lines;

  return null;
}

module.exports = {
  readlines,
  readlinesUntilEmpty
};
