const fs = require('fs');

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/06.txt', 'utf8');
  let res = 0;
  data.split("\n\n").forEach(lines => {
    lines = lines.split("\n");
    let map = new Map(),
      nofPeople = lines.length;
    lines.forEach(line => {
      line.split('').forEach(letter => {
        let cv = map.get(letter) || 0;
        map.set(letter, cv + 1);
      });
    });
    res += [...map].filter(el => el[1] === nofPeople).length;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);
