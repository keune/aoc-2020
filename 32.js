const fs = require('fs');

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/16.txt', 'utf8');
  data = data.split("\n\n");
  let allRangeNames = [];
  let ranges = data[0].split("\n").map(line => {
    line = line.split(': ');
    let name = line[0];
    let range = line[1].split(' or ')
      .map(r => r.split('-').map(n => +n));
    allRangeNames.push(name);
    return [name, range];
  });
  let myTicket = data[1].split("\n")[1].split(',').map(n => +n);
  let nearbyTickets = data[2].split("\n").slice(1).map(line => line.split(',').map(n => +n));

  nearbyTickets = nearbyTickets.filter(ticket => {
    return ticket.every(ticketVal => {
      return ranges.some(range => {
        return range[1].some(bigSmol => ticketVal >= bigSmol[0] && ticketVal <= bigSmol[1]);
      });
    });
  });

  let map = new Map();
  for (let i = 0; i < nearbyTickets.length; i++) {
    let ticket = nearbyTickets[i];
    for (let j = 0; j < ticket.length; j++) {
      let currentMatchingRanges = map.get(j);
      if (typeof currentMatchingRanges === 'undefined') currentMatchingRanges = allRangeNames.slice();
      let ticketVal = ticket[j];
      let notMatchingRanges = ranges.filter(range => {
        return range[1].some((bigSmol) => {
          return ticketVal >= bigSmol[0] && ticketVal <= bigSmol[1];
        }) === false;
      });
      notMatchingRanges.forEach(nmr => {
        let index = currentMatchingRanges.indexOf(nmr[0]);
        if (index !== -1) currentMatchingRanges.splice(index, 1);
      });
      
      map.set(j, currentMatchingRanges);
    }
  }
  
  map = [...map]
  while (true) {
    hasMultiple = false;
    for (let i = 0; i < map.length; i++) {
      if (map[i][1].length == 1) {
        let single = map[i][1][0];
        for (let j = 0; j < map.length; j++) {
          if (j != i) {
            let index = map[j][1].indexOf(single);
            if (index !== -1) map[j][1].splice(index, 1);
          }
        }
      } else {
        hasMultiple = true;
      }
    }
    if (!hasMultiple) break;
  }
  
  let prod = 1;
  [...map].map(m => m[1][0]).forEach((f, i) => {
    if (/^departure/.test(f)) {
      prod *= myTicket[i];
    }
  });
  return prod;
};

let answer = getAnswer();
console.log(answer);