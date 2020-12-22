const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/22.txt', 'utf8');
  data = data.split("\n\n").map(rawPlaya => rawPlaya.split("\n").slice(1).map(n => +n));
  let playa1 = data[0],
    playa2 = data[1];

  while (true) {
    if (!playa1.length || !playa2.length)
      break;
    let p1 = playa1.shift();
    let p2 = playa2.shift();
    if (p1 > p2) {
      playa1.push(p1);
      playa1.push(p2);
    } else if (p2 > p1) {
      playa2.push(p2);
      playa2.push(p1);
    }
  }
  
  let res = 0;
  let winner = playa1.length ? playa1 : playa2;
  winner.forEach((n, i) => {
    res += (winner.length - i) * n;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);