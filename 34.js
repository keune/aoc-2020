const fs = require('fs');

const findNeighbors = (x, y, z, w) => {
  let res = [];
  let initial = getStr(x, y, z, w);
  const walk = (prevNumbers, remainingNumbers) => {
    if (!remainingNumbers.length) {
      if (prevNumbers.join('_') !== initial)
        res.push(prevNumbers.slice());
    } else {
      let next = remainingNumbers.shift();
      [next - 1, next, next + 1].forEach((nn => {
        walk([...prevNumbers, nn], remainingNumbers.slice());
      }));
    }
  };

  walk([], [x, y, z, w]);
  return res;
};

const findNeighborsStr = str => {
  let [x, y, z, w] = str.split('_').map(n => +n);
  return findNeighbors(x, y, z, w).map(xyzw => getStr(...xyzw));
};

const intersect = (a, b) => {
  return a.filter(elA => b.includes(elA));
};

const diff = (a, b) => {
  return a.filter(elA => !b.includes(elA));
};

const getStr = (x, y, z, w) => `${x}_${y}_${z}_${w}`;

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/17.txt', 'utf8');
  data = data.split("\n");

  let actives = [];

  const isActiveStr = str => {
    return actives.includes(str);
  };

  const addToActivesStr = str => {
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
        addToActivesStr(getStr(x, y, 0, 0));
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