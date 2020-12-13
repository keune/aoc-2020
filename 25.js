const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/13.txt', 'utf8');
  data = data.split("\n");
  let earliest = +data[0];
  let busIds = data[1].split(',').filter(id => id != 'x').map(id => +id);
  
  let time = earliest;
  while (true) {
    let ids = busIds.filter(id => time % id === 0);
    if (ids.length === 1) {
      return (time - earliest) * ids[0];
    }
    time++;
  }
  return false;
};

let answer = getAnswer();
console.log(answer);