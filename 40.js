const fs = require('fs');

const d = (...args) => {
  console.log(...args);
};

const copyArrayOfArrays = (aofa) => {
  let res = [];
  for (let i = 0; i < aofa.length; i++) {
    res.push(aofa[i].slice());
  }
  return res;
};

const rotate = (tile, times = 1) => {
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
      res.push(newRow.join(''));
    }
    current = res.slice();
  }
  
  return current;
};

const flipX = lines => {
  let flipped = [...lines];
  let endP = flipped[0].length - 1;

  for (let i = 0; i < flipped.length; i++) {
    flipped[i] = flipped[i].split('').reverse().join('');
  }

  return flipped;
};

const flipY = lines => {
  let flipped = [...lines];
  flipped = rotate(flipped, 2);
  flipped = flipX(flipped);

  return flipped;
};

const uniq = arr => {
  return arr.filter((el, i) => arr.indexOf(el) === i);
};

const diff = (a, b) => {
  return a.filter(elA => !b.includes(elA));
};

const getVariationLines = lines => {
  let res = [[...lines]];
  res.push(rotate(lines, 1));
  res.push(rotate(lines, 2));
  res.push(rotate(lines, 3));
  res.push(flipY(lines));
  [flipY(lines), flipX(lines)].forEach(ft => {
    res.push(rotate(ft, 1));
    res.push(rotate(ft, 2));
    res.push(rotate(ft, 3));
  });

  let yarek = res.map(el => [el.join(''), el]);
  let uniqers = uniq(yarek.map(el => el[0]));  

  let resres = [];
  uniqers.forEach(uniqer => {
    let one = yarek.filter(el => el[0] == uniqer)[0];
    resres.push(one[1]);
  });

  return resres;
};

const getBorders = lines => {
  let tileLen = lines.length;

  let left = [], right = [];
  for (let i = 0; i < tileLen; i++) {
    left.push(lines[i][0]);
    right.push(lines[i][tileLen - 1]);
  }

  return res = [
    lines[0],
    left.join(''),
    right.join(''),
    lines[tileLen - 1]
  ];
};

const removeBorders = lines => {
  let cl = copyArrayOfArrays(lines);
  cl.shift();
  cl.pop();
  return cl.map(el => {
    return el.substring(1, el.length - 1);
  });
};

const visualize = (picture) => {
  let res = [];
  let nofrows = picture[0][0].lines.length;
  let size = picture.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < nofrows; k++) {
        let x = i * nofrows + k;
        res[x] = res[x] || '';
        res[x] += picture[i][j].lines[k];
      }
    }
  }
  return res.join("\n");
};

class TileVariation {
  constructor(tile, lines) {
    this.lines = lines;
    this.tile = tile;
    let borders = getBorders(lines);
    this.top = borders[0];
    this.left = borders[1];
    this.right = borders[2];
    this.bottom = borders[3];
    this.borders = borders;
  }
}

class Tile {
  constructor(id, lines) {
    this.id = id;
    this.lines = lines;

    this.variations = [];
    let that = this;
    getVariationLines(lines).forEach(variationLines => {
      this.variations.push(new TileVariation(that, variationLines));
    });
  }
}

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/20.txt', 'utf8');
  data = data.split("\n\n");

  let visualizeds = [];
  const allTileIds = [];
  const map = new Map();
  data.forEach(rawTile => {
    rawTile = rawTile.split("\n");
    let id = +rawTile[0].replace(/[^\d]/g, '');
    allTileIds.push(id);
    map.set(id, new Tile(id, rawTile.slice(1)));
  });

  const size = Math.sqrt(map.size);

  let solved = 0;
  const walk = (picture, usedTileIds) => {
    let unusedTileIds = diff(allTileIds, usedTileIds);
    if (!unusedTileIds) return false;

    let y, x;
    let isFirstTile = false, isLastTile = false;
    if (picture.length == 0) {
      picture[0] = [];
      y = 0;
      x = 0;
      isFirstTile = true;
    } else if (picture.length < size && picture[picture.length - 1].length == size) {
      y = picture.length;
      picture[y] = [];
      x = 0;
    } else {
      y = picture.length - 1;
      x = picture[y].length;
      if (x == size) isLastTile = true;
    }

    if (isLastTile) {
      let borderless = copyArrayOfArrays(picture);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          borderless[i][j].lines = removeBorders(borderless[i][j].lines);
        }
      }
      visualizeds.push(visualize(borderless));
      return;
    }
    
    let isPossible = (tileVariation) => {
      if (isFirstTile) return true;
      if (y == 0) {
        let prevVariation = picture[0][x - 1];
        return tileVariation.left == prevVariation.right;
      }
      if (x == 0) {
        let topVariation = picture[y - 1][0];
        return tileVariation.top == topVariation.bottom;
      }
      let leftVariation = picture[y][x - 1];
      let topVariation = picture[y - 1][x];
      return tileVariation.left == leftVariation.right && tileVariation.top == topVariation.bottom;
    };
    
    unusedTileIds.forEach(tileId => {
      let tile = map.get(tileId);
      tile.variations.forEach(variation => {
        if (isPossible(variation)) {
          let newPicture = copyArrayOfArrays(picture);
          newPicture[y][x] = variation;
          let newUsedTileIds = [...usedTileIds, tileId];
          walk(newPicture, newUsedTileIds);
        }
      });
    });
  };

  walk([], []);

  visualizeds.forEach(visualized => {
    let seaMonstersFound = 0;
    let vlines = visualized.split("\n");
    for (let i = 1; i < vlines.length - 1; i++) {
      let line = vlines[i];
      let sp = 0;
      let bodyReg = /#.{4}##.{4}##.{4}###/;
      let bodies = [];
      while (true) {
        let bodyStartIndex = line.slice(sp).search(bodyReg);
        if (bodyStartIndex === -1) break;
        bodies.push(bodyStartIndex + sp);
        sp += bodyStartIndex + 20;
      }

      let prevLine = vlines[i - 1];
      bodies.forEach(body => {
        if (prevLine[body + 18] == '#') {
          let nextLine = vlines[i + 1];
          let tailReg = /#(?:.{2}#){5}/;
          let tsp = body + 1;
          let tailStartIndex = nextLine.slice(tsp).search(tailReg);
          if (tailStartIndex == 0)
            seaMonstersFound++;
        }
      });
    }
    if (seaMonstersFound) {
      d('found em ' , visualized.match(/#/g).length - seaMonstersFound * 15);
    }
  })

  return false;
};

getAnswer();