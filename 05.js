const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/03.txt', 'utf8');
  data = data.split("\n");
  let res = 0,
    width = data[0].length,
    height = data.length
    x = 0,
    y = 0;
  while (y < height - 1) {
    x += 3;
    y += 1;
    if (x >= width) x -= width;
    if (data[y][x] === '#') {
      res++;
    }
  }
  return res;
};

let answer = getAnswer();
console.log(answer);