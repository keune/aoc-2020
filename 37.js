const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/19.txt', 'utf8');
  data = data.split("\n\n");
  let rules = new Map();
  data[0].split("\n").forEach(line => {
    line = line.split(': ');
    rules.set(line[0], line[1]);
  });
  let messages = data[1].split("\n");
  
  const parseRule = rule => {
    let matches = [];
    if ((matches = rule.match(/^\"([a-b])\"$/))) {
      return matches[1];
    }
    if ((matches = rule.match(/^(\d+)$/))) {
      return parseRule(rules.get(matches[1]));
    }
    if (rule.includes(' | ')) {
      let subRules = rule.split(' | ');
      return '((' + parseRule(subRules[0]) + ')|(' + parseRule(subRules[1]) + '))';
    }
    if (rule.includes(' ')) {
      let subRules = rule.split(' ');
      return subRules.map(subRule => parseRule(subRule)).join('');
    }
    return null;
  };

  let reg = new RegExp('^' + parseRule('0') + '$');
  let res = 0;
  for (let i = 0; i < messages.length; i++) {
    if (reg.test(messages[i]))
      res++;
  }
  return res;
};

let answer = getAnswer();
console.log(answer);