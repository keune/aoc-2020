const fs = require('fs');

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.str = `${this.x}_${this.y}`;
  }
}

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

const getNeighborTiles = tile => {
  let res = [];
  directions.forEach(diff => {
    res.push(new Tile(tile.x + diff[0], tile.y + diff[1]));
  });
  return res;
};

const getAnswer = () => {
  let blacks = new Map();
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
    let tile = new Tile(x, y);
    if (!blacks.has(tile.str))
      blacks.set(tile.str, tile);
    else
      blacks.delete(tile.str);
  }

  for (let i = 0; i < 100; i++) {
    let whites = new Map();
    blacks.forEach(tile => {
      let neighborTiles = getNeighborTiles(tile);
      neighborTiles.forEach(neighborTile => {
        if (!blacks.has(neighborTile.str) && !whites.has(neighborTile.str))
          whites.set(neighborTile.str, neighborTile);
      });
    });

    let newBlacks = new Map();

    blacks.forEach(tile => {
      let neighborTiles = getNeighborTiles(tile);
      let blackCount = neighborTiles.filter(neighborTile => blacks.has(neighborTile.str)).length;
      if ([1, 2].includes(blackCount))
        newBlacks.set(tile.str, tile);
    });

    whites.forEach(tile => {
      let neighborTiles = getNeighborTiles(tile);
      let blackCount = neighborTiles.filter(neighborTile => blacks.has(neighborTile.str)).length;
      if (blackCount === 2)
        newBlacks.set(tile.str, tile);
    });

    blacks = newBlacks;
  }

  return blacks.size;
};

let answer = getAnswer();
console.log(answer);