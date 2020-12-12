const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/12.txt', 'utf8');
  data = data.split("\n").map(str => [str[0], +str.slice(1)]);
  let x = 0, 
    y = 0,
    dirs = ['E', 'S', 'W', 'N'],
    curDir = 0;
  for (let i = 0; i < data.length; i++) {
    let action = data[i][0],
      val = data[i][1];

    if (['L', 'R'].includes(action)) {
      let change = val / 90;
      if (action == 'L') change *= -1;
      curDir += change;
      if (curDir < 0) curDir += 4;
      curDir = curDir % 4;
    }
    if (action == 'F') {
      action = dirs[curDir];
    }
    if (action == 'N') y -= val;
    if (action == 'S') y += val;
    if (action == 'W') x -= val;
    if (action == 'E') x += val;
  }

  return Math.abs(x) + Math.abs(y);
};

let answer = getAnswer();
console.log(answer);