const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/10.txt', 'utf8');
  data = data.split("\n").map(n => +n).sort((a, b) => a - b);
  let biggest = data[data.length - 1] + 3,
    nums = [0, ...data, biggest],
    al = new Map(),
    walked = new Map();
  
  nums.forEach(num => {
    let adjacents = nums.filter(n => n > num && n <= num + 3);
    al.set(num, adjacents);
  });

  const walk = (sn, en) => {
    if (sn === en) return 1;
    if (typeof walked.get(sn) !== 'undefined')
      return walked.get(sn);

    let sum = 0;
    al.get(sn).forEach(cn => sum += walk(cn, en));
    walked.set(sn, sum);
    return sum;
  };

  return walk(0, biggest);
};
let answer = getAnswer();
console.log(answer);