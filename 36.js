const fs = require('fs');

const getLevelSubExpressions = expression => {
  let res = [];
  let startP = 0;
  while (true) {
    startP = expression.indexOf('(', startP);
    if (startP === -1) break;
    let nextStart = expression.indexOf('(', startP + 1);
    let endP = expression.indexOf(')', startP);

    while (nextStart !== -1 && nextStart < endP) {
      endP = expression.indexOf(')', endP + 1);
      nextStart = expression.indexOf('(', nextStart + 1);
    }
    res.push(expression.substring(startP, endP + 1));
    startP = endP + 1;
  }
  return res;
};

const solve = expression => {
  let subExpressions = getLevelSubExpressions(expression);
  if (subExpressions.length) {
    subExpressions.forEach(subExpression => {
      let subExpressionWithoutOuterParantheses = subExpression.substring(1, subExpression.length - 1);
      let subSolution = solve(subExpressionWithoutOuterParantheses);
      expression = expression.replace(subExpression, subSolution);
    });
    return solve(expression);
  } else {
    let numsAndOperators = expression.split(' ');
    while (numsAndOperators.length > 1) {
      let startP = 0, preferred;
      if ((preferred = numsAndOperators.indexOf('+')) !== -1) {
        startP = preferred - 1;
      }
      let curOperation = numsAndOperators.splice(startP, 3);
      let num1 = +curOperation[0];
      let num2 = +curOperation[2];
      let operator = curOperation[1];
      let result;
      if (operator == '*') {
        result = num1 * num2;
      } else {
        result = num1 + num2;
      }
      numsAndOperators.splice(startP, 0, result);
    }
    return numsAndOperators[0];
  }
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/18.txt', 'utf8');
  data = data.split("\n");
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    let line = data[i];
    res += solve(line);
  }
  return res;
};

let answer = getAnswer();
console.log(answer);