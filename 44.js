const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/22.txt', 'utf8');
  data = data.split("\n\n").map(rawPlaya => rawPlaya.split("\n").slice(1).map(n => +n));
  let initialPlaya1 = data[0],
    initialPlaya2 = data[1];

  const getRoundStr = (p1, p2) => p1.join('_') + '*' + p2.join('_');
  
  const play = (playa1, playa2) => {
    let played = [];
    while (true) {
      if (!playa1.length || !playa2.length)
        break;
      let roundStr = getRoundStr(playa1, playa2);
      if (played.includes(roundStr)) {
        playa2 = [];
        break;
      }
      played.push(roundStr);
      let p1 = playa1.shift();
      let p2 = playa2.shift();

      if (p1 <= playa1.length && p2 <= playa2.length) {
        let [subPlaya1, subPlaya2] = play(playa1.slice(0, p1), playa2.slice(0, p2));
        if (subPlaya1.length) {
          playa1 = [...playa1, p1, p2];
        } else {
          playa2 = [...playa2, p2, p1];
        }
      } else {
        if (p1 > p2) {
          playa1.push(p1);
          playa1.push(p2);
        } else {
          playa2.push(p2);
          playa2.push(p1);
        }
      }
    }
    return [playa1, playa2];
  };

  let [resPlaya1, resPlaya2] = play(initialPlaya1, initialPlaya2);
  
  let res = 0;
  let winner = resPlaya1.length ? resPlaya1 : resPlaya2;
  winner.forEach((n, i) => {
    res += (winner.length - i) * n;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);