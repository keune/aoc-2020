const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/09.txt', 'utf8');
  data = data.split("\n").map(n => +n);
  const pl = 25;
  let invalid = null;
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
    invalid = data[i];
    break outest;
  }

  for (let i = 0; i < data.length - 1; i++) {
    let sum = data[i],
      j = i + 1;
    while (sum < invalid && j < data.length) {
      sum += data[j];
      if (sum === invalid) {
        let range = data.slice(i, j + 1).sort((a, b) => a - b);
        return range[0] + range[range.length - 1];
      }
      j++;
    }
  }
  return false;
};

let answer = getAnswer();
console.log(answer);