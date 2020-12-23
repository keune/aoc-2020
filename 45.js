const d = (...args) => {
  console.log(...args);
};

const dd = (...args) => {
  console.log(...args);
  process.exit();
};

const getAnswer = () => {
  let cupStr = '193467258';
  //let cupStr = '389125467';

  let cups = cupStr.split('').map(n => +n);
  let sorted = cups.slice().sort((a, b) => a - b);
  let smallest = sorted[0];
  let biggest = sorted[sorted.length - 1];
  let noc = cups.length;
  
  let current = cups[0];
  for (let i = 0; i < 100; i++) {
    d(`-- move ${i+1} --`)
    d('current ', current)
    let currentIndex = cups.indexOf(current);
    let pickedCups = cups.splice(currentIndex + 1, 3);
    if (pickedCups.length  < 3) {
      let pickedFromStart = cups.splice(0, 3 - pickedCups.length);
      pickedCups = [...pickedCups, ...pickedFromStart]
    }
    d('pickedCups', pickedCups.join(','))
    let destination = current - 1;
    if (destination < smallest)
        destination = biggest;
    while (pickedCups.includes(destination)) {
      destination--;
      if (destination < smallest)
        destination = biggest;
    }
    d('destination ', destination)
    let destinationIndex = cups.indexOf(destination);
    cups.splice(destinationIndex + 1, 0, ...pickedCups);

    currentIndex = cups.indexOf(current) + 1;
    if (currentIndex === noc) currentIndex = 0;
    current = cups[currentIndex];
    d("\n")
  }

  let oneIndex = cups.indexOf(1);
  let res = [...cups.slice(oneIndex + 1), ...cups.slice(0, oneIndex)].join('');
  return res;
};

let answer = getAnswer();
console.log(answer);