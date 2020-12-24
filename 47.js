const fs = require('fs');

const directions = new Map([
  ['e',  [4, 0]],
  ['se', [2, 4]],
  ['sw', [-2, 4]],
  ['w',  [-4, 0]],
  ['nw', [-2, -4]],
  ['ne', [2, -4]],
]);

const parseLine = line => {
  let res = [];
  let i = 0;
  let directionKeys = [...directions.keys()];
  while (i < line.length) {
    let c1 = line[i];
    let c12 = i < line.length ? line[i] + line[i + 1] : null;;
    if (directionKeys.includes(c1)) {
      res.push(c1);
      i++;
    } else if (directionKeys.includes(c12)) {
      res.push(c12);
      i += 2;
    }
  }
  return res;
};

const getAnswer = () => {
  let blacked = [];
  let data = fs.readFileSync('./inputs/24.txt', 'utf8');
  data = data.split("\n");
  for (let i = 0; i < data.length; i++) {
    let line = data[i];
    let x = 0, y = 0;
    parseLine(line).forEach(dir => {
      let diff = directions.get(dir);
      x += diff[0];
      y += diff[1];
    });
    let str = `${x}_${y}`;
    let tileIndex = blacked.indexOf(str);
    if (tileIndex === -1)
      blacked.push(str);
    else
      blacked.splice(tileIndex, 1);
  }
  return blacked.length;
};

let answer = getAnswer();
console.log(answer);