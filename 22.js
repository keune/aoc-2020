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

  const inGrid = (y, x) => y >= 0 && 
    x >= 0 && 
    y < seats.length && 
    x < seats[y].length;

  let cs = seats.slice();
  while (true) {
    let ns = cs.map((row, i) => {
      return row.map((col, j) => {
        if (col == 'L') {
          for (let k = 0; k < directions.length; k++) {
            let ny = i;
            let nx = j;
            while (true) {
              ny += directions[k][0];
              nx += directions[k][1];
              if (!inGrid(ny, nx)) break;
              if (cs[ny][nx] === '#') {
                return col;
              }
              if (cs[ny][nx] !== '.') {
                break;
              }
            }
          }
          return '#';
        } else if (col == '#') {
          let totAdj = 0;
          for (let k = 0; k < directions.length; k++) {
            let ny = i;
            let nx = j;
            while (true) {
              ny += directions[k][0];
              nx += directions[k][1];
              if (!inGrid(ny, nx)) break;
              if (cs[ny][nx] === '#') {
                totAdj++;
                if (totAdj >= 5) return 'L';
              }
              if (cs[ny][nx] !== '.') {
                break;
              }
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
