const fs = require('fs');

const getAnswer = () => {
  const data = fs.readFileSync('./inputs/07.txt', 'utf8');
  let map = new Map();
  data.split("\n").forEach(line => {
    line = line.split(' bags contain ');
    let containerBag = line[0];
    let bags = line[1].split(', ').map(el => el.trim().replace(/^\d+\s(.+)\sbags?\.?$/, '$1'));
    bags.forEach(bag => {
      let containsThis = map.get(bag) || [];
      containsThis.push(containerBag);
      map.set(bag, containsThis);
    });
  });

  let finalContainers = [];
  const findContainers = bag => {
    let containerBags = map.get(bag);
    containerBags && containerBags.forEach(containerBag => {
      if (!finalContainers.includes(containerBag)) {
        finalContainers.push(containerBag);
        findContainers(containerBag);
      }
    });
  };

  findContainers('shiny gold');
  return finalContainers.length;
};

let answer = getAnswer();
console.log(answer);
