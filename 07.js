const fs = require('fs');

const getAnswer = () => {
  const required = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
  const data = fs.readFileSync('./inputs/04.txt', 'utf8');
  let res = 0;
  data.split("\n\n").forEach(lines => {
    let props = [];
    lines.split("\n").forEach(line => {
      line.split(' ').forEach(prop => props.push(prop.split(':')[0]));
    });
    if (required.filter(rf => !props.includes(rf)).length === 0) res++;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);