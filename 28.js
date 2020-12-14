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

const getCombs = (mask) => {
  let combs = [];

  const walk = (m) => {
    if (m.indexOf('X') !== -1) {
      let zero = m.replace('X', '0');
      let one = m.replace('X', '1');
      walk(zero);
      walk(one);
    } else {
      combs.push(m);
    }
  };

  let m2 = mask.replace(/[^X]/g, '.');
  walk(m2);
  return combs;
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/14.txt', 'utf8');
  data = data.split("\n");
  
  let mem = new Map();
  let mask = getMask(data[0]);
  let maskCombs = getCombs(mask);
  for (let i = 1; i < data.length; i++) {
    if (/^mem/.test(data[i])) {
      let [address, val] = getAddVal(data[i]);

      address = get36(address).split('').map((c, i) => {
        if (mask[i] == 1) return 1;
        return c;
      }).join('');

      let addresses = maskCombs.map(comb => {
        return comb.split('').map((c, i) => {
          if (c == '.') {
            return address[i];
          }
          return c;
        }).join('');
      });
      addresses.forEach(a => mem.set(a, val));
    } else {
      mask = getMask(data[i]);
      maskCombs = getCombs(mask);
    }
  }
  return [...mem.values()].reduce((a, b) => a + b, 0);
};

let answer = getAnswer();
console.log(answer);