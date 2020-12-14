const fs = require('fs');

const getMask = str => str.replace('mask = ', '');

const getAddVal = str => {
  let matches = str.match(/^mem\[(\d+)\] = (\d+)$/);
  return [+matches[1], +matches[2]];
};

const get36 = n => {
  let str = n.toString(2);
  return ('0'.repeat(36) + str).substr(-36);
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/14.txt', 'utf8');
  data = data.split("\n");
  
  let mem = new Map();
  let mask = getMask(data[0]);
  for (let i = 1; i < data.length; i++) {
    if (/^mem/.test(data[i])) {
      let [address, val] = getAddVal(data[i]);
      val = get36(val).split('').map((el, i) => {
        if (mask[i] == 'X') return el;
        return mask[i];
      }).join('');
      mem.set(address, parseInt(val, 2));
    } else {
      mask = getMask(data[i]);
    }
  }
  return [...mem.values()].reduce((a, b) => a + b, 0);
};

let answer = getAnswer();
console.log(answer);