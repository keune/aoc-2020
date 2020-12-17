const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/16.txt', 'utf8');
  data = data.split("\n\n");
  let ranges = data[0].split("\n").map(line => {
    return line.split(': ')[1]
      .split(' or ')
      .map(r => r.split('-').map(n => +n));
  });
  let nearbyTickets = data[2].split("\n").slice(1).map(line => line.split(',').map(n => +n));
  let sum = 0;
  for (let i = 0; i < nearbyTickets.length; i++) {
    let ticket = nearbyTickets[i];
    ticketValLoop:
    for (let j = 0; j < ticket.length; j++) {
      let ticketVal = ticket[j];
      for (let k = 0; k < ranges.length; k++) {
        for (let l = 0; l < ranges[k].length; l++) {
          let curRange = ranges[k];
          if (curRange[l][0] <= ticketVal && curRange[l][1] >= ticketVal) {
            continue ticketValLoop;
          }
        }
      }
      sum += ticketVal;
    }
  }
  return sum;
};

let answer = getAnswer();
console.log(answer);