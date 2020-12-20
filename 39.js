const fs = require('fs');

const rotateTile = (tile, times = 1) => {
  let current = [...tile];
  for (t = 0; t < times; t++) {
    let rows = current.length;
    let cols = current[0].length;
    let res = [];
    for (let i = 0; i < rows; i++) {
      let newRow = [];
      for (let j = 0; j < cols; j++) {
        newRow.push(current[rows - j - 1][i]);
      }
      res.push(newRow);
    }
    current = res.slice();
  }
  
  return current;
}

const flipY = tile => {
  let flipped = [...tile];
  let endP = flipped.length - 1;

  for (let i = 0; i < flipped[0].length; i++) {
    for (let j = 0, k = endP; j < Math.ceil(endP / 2); j++, k--) {
      let swap = flipped[j][i];
      flipped[j][i] = flipped[k][i];
      flipped[k][i] = swap;
    }
  }

  return flipped;
};

const getBorders = tile => {
  let tileLen = tile.length;

  let left = [], right = [];
  for (let i = 0; i < tileLen; i++) {
    left.push(tile[i][0]);
    right.push(tile[i][tileLen - 1]);
  }

  return res = [
    tile[0],
    left,
    right,
    tile[tileLen - 1]
  ];
};


const getMatchingBordersAsString = (a, b) => {
  let ax = a.map(border => border.join(''));
  let bx = b.map(border => border.join(''));
  return ax.filter(str => bx.includes(str));
};

const getVersions = tile => {
  let res = [[...tile]];
  res.push(rotateTile(tile, 1));
  res.push(rotateTile(tile, 2));
  res.push(rotateTile(tile, 3));
  res.push(flipY(tile));
  [flipY(tile)].forEach(ft => {
    res.push(rotateTile(ft, 1));
    res.push(rotateTile(ft, 2));
    res.push(rotateTile(ft, 3));
  });

  return res;
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/20.txt', 'utf8');
  data = data.split("\n\n");

  let map = new Map();
  data.forEach(rawTile => {
    rawTile = rawTile.split("\n");
    let tileData = rawTile.slice(1).map(row => row.split(''));
    let versionsData = getVersions(tileData);
    let versions = [];
    versionsData.forEach(versionData => {
      versions.push({
        data: versionData,
        borders: getBorders(versionData)
      });
    });
    map.set(+rawTile[0].replace(/[^\d]/g, ''), {data: tileData, versions: versions});
  });

  let edges = [];
  for (let [key, tile] of map) {
    let versions = tile.versions;
    versions.forEach(version => {
      let borders = version.borders;
      let tp = 0;
      for (let [compareKey, compareTile] of map) {
        if (compareKey == key) continue;
        let compareVersions = compareTile.versions;
        compareVersions.forEach(compareVersion => {
          let compareBorders = compareVersion.borders;
          let matched = getMatchingBordersAsString(borders, compareBorders);
          tp += (matched.length);
        });
      }
      if (tp == 8 && !edges.includes(key)) edges.push(key)
    });
    
  }

  return edges.reduce((a, b) => a * b, 1);
};

let answer = getAnswer();
console.log(answer);