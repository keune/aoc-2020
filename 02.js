const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/01.txt', 'utf8');
  data = data.split("\n").map(n => +n).sort((a,b) => a-b);
  for (let i = 0; i < data.length - 2; i++) {
    let first = data[i];
    for (let j = i + 1; j < data.length - 1; j++) {
      let second = data[j];
      if (first + second >= 2020) break;
      for (let k = j + 1; k < data.length; k++) {
        let third = data[k];
        let sum = first + second + third;
        if (sum === 2020)
          return first * second * third;
        if (sum > 2020) {
          break;
        }
      }
    }
  }
  return false;
};

let answer = getAnswer();
console.log(answer);