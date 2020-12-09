const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/09.txt', 'utf8');
  data = data.split("\n").map(n => +n);
  const pl = 25;
  outest:
  for (let i = pl; i < data.length; i++) {
    for (let j = i - pl; j < i - 1; j++) {
      let first = data[j];
      for (let k = j + 1; k < i; k++) {
        let second = data[k];
        if (first + second === data[i]) {
          continue outest;
        }
      }
    }
    console.log(i)
    return data[i];
  }
  return false;
};

let answer = getAnswer();
console.log(answer);