const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/13.txt', 'utf8');
  data = data.split("\n");
  let busIds = data[1].split(','),
    first = +busIds[0],
    time = first,
    jump = first,
    startLookin = 1;
  while (true) {
    let broken = false;
    for (let i = startLookin; i < busIds.length; i++) {
      let id = busIds[i];
      if (id == 'x') {
        startLookin++;
        continue;
      }
      if ((time + i) % id === 0) {
        jump *= id;
        startLookin++;
      } else {
        broken = true;
        time+= jump;
        break;
      }
    }
    if (!broken) {
      return time;
    }
  }
};

let answer = getAnswer();
console.log(answer);