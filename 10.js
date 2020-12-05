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

const compareCodes = (a, b) => {
  let aRow = a.substr(0, 7), bRow = b.substr(0, 7);
  if (aRow < bRow) return -1;
  if (aRow > bRow) return 1;
  let aCol = a.substr(7), bCol = b.substr(7);
  if (aCol < bCol) return 1;
  if (aCol > bCol) return -1;
  return 0;
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/05.txt', 'utf8');
  data = data.split("\n").sort(compareCodes);
  let big = data[0], smol = data[data.length - 1];
  
  let code = false;
  const walk = function(str) {
    if (code) return;
    let strings = [];
    if (str.length >= 7) {
      strings = [str + 'R', str + 'L'];
    } else {
      strings = [str + 'B', str + 'F'];
    }
    if (str.length == 9) {
      strings.forEach(s => {
        if ([0, -1].includes(compareCodes(s, smol)) && 
          [0, 1].includes(compareCodes(s, big)) && 
          !data.includes(s)
        ) {
          code = s;
        }
      });
    } else {
      strings.forEach(s => walk(s));
    }
  };

  walk('');
  return getId(code);
};

let answer = getAnswer();
console.log(answer);
