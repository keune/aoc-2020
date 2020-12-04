const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/02.txt', 'utf8');
  data = data.split("\n");
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    let line = data[i];
    line = line.split(': ');
    let rule = line[0].split(' '),
      pass = line[1];

    let times = rule[0].split('-').map(n => +n);
    let char = rule[1];
    let found = pass.split(char).length - 1;
    if (found >= times[0] && found <= times[1])
      res++;
    
  }
  return res;
};

let answer = getAnswer();
console.log(answer);