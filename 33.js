const fs = require('fs');

const findNeighbors = (x, y, z) => {
  let xys = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ].map(addXY => [x + addXY[0], y + addXY[1]]);

  let res = [];
  [z - 1, z, z + 1].forEach(zv => {
    res = [...res, ...(xys.map(xy => [...xy, zv]))];
  });
  res.push([x, y, z - 1]);
  res.push([x, y, z + 1]);
  return res;
};

const findNeighborsStr = str => {
  let [x, y, z] = str.split('_').map(n => +n);
  return findNeighbors(x, y, z).map(xyz => getStr(...xyz));
};

const getStr = (x, y, z) => `${x}_${y}_${z}`;

const intersect = (a, b) => {
  return a.filter(elA => b.includes(elA));
};

const diff = (a, b) => {
  return a.filter(elA => !b.includes(elA));
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/17.txt', 'utf8');
  data = data.split("\n");

  let actives = [];

  const isActiveStr = (str) => {
    return actives.includes(str);
  };

  const addToActivesStr = (str) => {
    actives.push(str);
  };

  const decide = str => {
    let neighbors = findNeighborsStr(str);
    let activeNeighbors = intersect(neighbors, actives);
    if (isActiveStr(str) && [2, 3].includes(activeNeighbors.length)) {
      return true;
    } else if (!isActiveStr(str) && activeNeighbors.length == 3) {
      return true;
    }
    return false;
  };

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      let cell = data[y][x];
      if (cell == '#') {
        addToActivesStr(getStr(x, y, 0));
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    let newActives = [];
    let done = [];

    actives.forEach(str => {
      let neighborsAndItself = findNeighborsStr(str);
      neighborsAndItself.push(str);
      neighborsAndItself = diff(neighborsAndItself, done);
      neighborsAndItself.forEach(oneStr => {
        if (decide(oneStr) && !newActives.includes(oneStr))
          newActives.push(oneStr);
        done.push(oneStr);
      });
    });

    actives = newActives;
  }

  return actives.length;
};

let answer = getAnswer();
console.log(answer);