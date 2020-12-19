const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/19.txt', 'utf8');
  data = data.split("\n\n");
  let rules = new Map();
  data[0].split("\n").forEach(line => {
    line = line.split(': ');
    rules.set(line[0], line[1]);
  });
  rules.set('8', '42 | 42 8');
  rules.set('11', '42 31 | 42 11 31');
  let messages = data[1].split("\n");
  
  const parseRule = (rule, rl = 1) => {
    rl--;
    let matches = [];
    if ((matches = rule.match(/^\"([a-b])\"$/))) {
      return matches[1];
    }
    if ((matches = rule.match(/^(\d+)$/))) {
      if (rl < 0 && ['8', '11'].includes(matches[1])) {
        if (matches[1] == '8') return parseRule('42', 1)
        if (matches[1] == '11') return parseRule('42 31', 1)
      }
      return parseRule(rules.get(matches[1]), rl);
    }
    if (rule.includes(' | ')) {
      let subRules = rule.split(' | ');
      return '((?:' + parseRule(subRules[0], rl) + ')|(?:' + parseRule(subRules[1], rl) + '))';
    }
    if (rule.includes(' ')) {
      let subRules = rule.split(' ');
      return subRules.map(subRule => parseRule(subRule, rl)).join('');
    }
    return null;
  };

  let reg = new RegExp('^' + parseRule('0', 100) + '$');
  let res = 0;

  for (let i = 0; i < messages.length; i++) {
    if (reg.test(messages[i])) {
      res++;
    }
  }
  return res;
};

let answer = getAnswer();
console.log(answer);