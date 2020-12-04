const fs = require('fs');

const validate = (key, val) => {
  let isValid = false;
  switch (key) {
    case 'byr':
      isValid = val >= 1920 && val <= 2002;
    break;
    case 'iyr':
      isValid = val >= 2010 && val <= 2020; 
    break;
    case 'eyr':
      isValid = val >= 2020 && val <= 2030; 
    break;
    case 'hgt':
      if (/^\d{2,3}(in|cm)$/.test(val)) {
        let num = parseInt(val);
        if (val.includes('in')) {
          isValid = num >= 59 && num <= 76;
        } else {
          isValid = num >= 150 && num <= 193;
        }
      }
    break;
    case 'hcl':
      isValid = /^#[0-9a-f]{6}$/.test(val);
    break;
    case 'ecl':
      isValid = ['amb','blu','brn','gry','grn','hzl','oth'].includes(val);
    break;
    case 'pid':
      isValid = /^\d{9}$/.test(val);
    break;
  }
  return isValid;
};

const getAnswer = () => {
  const required = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
  const data = fs.readFileSync('./inputs/04.txt', 'utf8');
  let res = 0;
  data.split("\n\n").forEach(lines => {
    let props = [], hasChance = true;
    lines.split("\n").forEach(line => {
      hasChance && line.split(' ').forEach(keyVal => {
        if (!hasChance) return;
        keyVal = keyVal.split(':');
        if (validate(keyVal[0], keyVal[1])) {
          props.push(keyVal[0]);
        } else {
          if (required.includes(keyVal[0])) hasChance = false;
        }
      });
    });
    if (required.filter(rf => !props.includes(rf)).length === 0) res++;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);