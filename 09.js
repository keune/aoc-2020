const fs = require('fs');

const getId = (code) => {
  let min = 0, max = 127;
  for (let i = 0; i < 7; i++) {
    let diff = max - min + 1;
    if (code[i] == 'B') {
      min += diff / 2;
    } else {
      max -= diff / 2;
    }
  }
  let res = min * 8;

  min = 0, max = 7;
  for (let i = 7; i < 10; i++) {
    let diff = max - min + 1;
    if (code[i] == 'R') {
      min += diff / 2;
    } else {
      max -= diff / 2;
    }
  }
  return res + min;
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/05.txt', 'utf8');
  data = data.split("\n").map(str => [str.substr(0,7), str.substr(7)]);
  let code = data.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  })[0].join('');

  return getId(code);
};

let answer = getAnswer();
console.log(answer);
