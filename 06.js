const fs = require('fs');

let data = fs.readFileSync('./inputs/03.txt', 'utf8');
data = data.split("\n");

const getAnswer = (addX, addY) => {
  let res = 0,
    width = data[0].length,
    height = data.length
    x = 0,
    y = 0;
  while (y < height - 1) {
    x += addX;
    y += addY;
    if (x >= width) x -= width;
    if (data[y][x] === '#') {
      res++;
    }
  }
  return res;
};

let answer = [
  [1 , 1],
  [3 , 1],
  [5 , 1],
  [7 , 1],
  [1 , 2],
].map(inp => getAnswer(inp[0], inp[1]))
.reduce((a, b) => a * b, 1);
console.log(answer);