const fs = require('fs');

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/06.txt', 'utf8');
  let res = 0;
  data.split("\n\n").forEach(lines => {
    let map = new Map();
    lines.split("\n").forEach(line => {
      line.split('').forEach(letter => {
        map.set(letter, 1);
      });
    });
    res += map.size;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);
