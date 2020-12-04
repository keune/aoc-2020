const fs = require('fs');

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/02.txt', 'utf8');
  data = data.split("\n");
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    let line = data[i];
    line = line.split(': ');
    let rule = line[0].split(' '),
      pass = line[1];

    let positions = rule[0].split('-').map(n => +n - 1);
    let char = rule[1];
    let correct = [pass[positions[0]], pass[positions[1]]].filter(c => c === char).length === 1;
    let found = pass.split(char).length - 1;
    if (correct)
      res++;
    
  }
  return res;
};

let answer = getAnswer();
console.log(answer);