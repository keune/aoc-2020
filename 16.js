const fs = require('fs');

const parseLine = line => {
  let parts = line.split(' ');
  return [parts[0], +parts[1]];
};

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/08.txt', 'utf8');
  let lines = data.split("\n");

  const walk = lines => {
    let visited = [],
      i = 0,
      res = 0;

    while (i < lines.length) {
      if (visited.includes(i)) {
        return false;
      }
      let [inst, diff] = parseLine(lines[i]);

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

  for (let i = 0; i < lines.length; i++) {
    let [inst, diff] = parseLine(lines[i]);
    if (['nop', 'jmp'].includes(inst)) {
      let copyLines = lines.slice();
      if (inst == 'nop') {
        copyLines[i] = copyLines[i].replace('nop', 'jmp');
      } else {
        copyLines[i] = copyLines[i].replace('jmp', 'nop');
      }
      let res = walk(copyLines);
      if (res !== false) {
        return res;
      }
    }
  }

  return null;
};

let answer = getAnswer();
console.log(answer);
