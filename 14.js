const fs = require('fs');

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/07.txt', 'utf8');
  let map = new Map();
  data.split("\n").forEach(line => {
    line = line.split(' bags contain ');
    let containerBag = line[0];
    let bags = line[1].split(', ').map(el => el.trim().replace(/^(\d+\s.+)\sbags?\.?$/, '$1'));
    map.set(containerBag, bags);
  });

  const findTotal = (containerBag) => {
    let bags = map.get(containerBag);
    let total = 0;
    bags && bags.forEach(bagAndCount => {
      bagAndCount = bagAndCount.match(/^(\d+)\s(.+)$/);
      if (bagAndCount) {
        let count = +bagAndCount[1];
        if (count > 0) {
          let bag = bagAndCount[2];
          let subTotal = findTotal(bag) + 1;
          total += subTotal * count;
        }
      }
    });
    return total;
  };

  return findTotal('shiny gold');
};

let answer = getAnswer();
console.log(answer);
