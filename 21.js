const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/11.txt', 'utf8');
  let seats = data.split("\n").map(row => row.split(''));

  const directions = [
    // y, x
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let cs = seats.slice();
  while (true) {
    let ns = cs.map((row, i) => {
      return row.map((col, j) => {
        if (col == 'L') {
          for (let k = 0; k < directions.length; k++) {
            let ny = directions[k][0] + i;
            let nx = directions[k][1] + j;
            if (typeof cs[ny] !== 'undefined' && cs[ny][nx] === '#') {
              return col;
            }
          }
          return '#';
        } else if (col == '#') {
          let totAdj = 0;
          for (let k = 0; k < directions.length; k++) {
            let ny = directions[k][0] + i;
            let nx = directions[k][1] + j;
            if (typeof cs[ny] !== 'undefined' && cs[ny][nx] === '#') {
              totAdj++;
              if (totAdj >= 4) return 'L';
            }
          }
        }
        return col;
      });
    });
    if (cs.toString() === ns.toString()) break;
    cs = ns.slice();
  }
  
  return cs.reduce((a, b) => a + b.filter(f => f === '#').length, 0);
};

let answer = getAnswer();
console.log(answer);
