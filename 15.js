const fs = require('fs');

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/08.txt', 'utf8');
  let lines = data.split("\n"),
    visited = [],
    i = 0,
    res = 0;

  while (true) {
    if (visited.includes(i)) {
      break;
    }
    let line = lines[i].split(' '),
      inst = line[0],
      diff = +line[1];

    visited.push(i);
    if (inst == 'jmp') {
      i += diff;
      continue;
    }
    if (inst == 'acc') {
      res += diff;
    }
    i++;
  }

  return res;
};

let answer = getAnswer();
console.log(answer);
