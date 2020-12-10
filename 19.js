const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/10.txt', 'utf8');
  data = data.split("\n").map(n => +n).sort((a, b) => a - b);
  let ones = 1, 
    threes = 1;
  for (let i = 1; i < data.length; i++) {
    let diff = data[i] - data[i-1];
    if (diff === 3) {
      threes++;
    } else if (diff === 1) {
      ones++;
    }
  }
  return ones * threes;
};

let answer = getAnswer();
console.log(answer);