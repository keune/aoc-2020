const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/12.txt', 'utf8');
  data = data.split("\n").map(str => [str[0], +str.slice(1)]);

  let x = 0, 
    y = 0,
    wx = 10,
    wy = -1;
  for (let i = 0; i < data.length; i++) {
    let action = data[i][0],
      val = data[i][1];

    if (['L', 'R'].includes(action)) {
      let change = val / 90;
      for (let j = 0; j < change; j++) {
        let cx = wx, cy = wy;
        if (action == 'L') {
          wx = cy;
          wy = cx * -1;
        } else {
          wx = cy * -1;
          wy = cx;
        }
      }
    }
    if (action == 'F') {
      x += val * wx;
      y += val * wy;
    }
    if (action == 'N') wy -= val;
    if (action == 'S') wy += val;
    if (action == 'W') wx -= val;
    if (action == 'E') wx += val;
  }

  return Math.abs(x) + Math.abs(y);
};

let answer = getAnswer();
console.log(answer);