class LinkedList {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const getAnswer = () => {
  let cupStr = '193467258';

  let map = [];
  let prev = null;
  let current = null;
  let cups = cupStr.split('').map(n => +n);

  let sorted = cups.slice().sort((a, b) => a - b);
  let smallest = sorted[0];
  let biggest = sorted[sorted.length - 1];
  for(let i = biggest + 1; i <= 1000000; i++) {
    cups.push(i);
    biggest = i;
  }
  let noc = cups.length;

  cups.forEach(cup => {
    let ll = new LinkedList(cup);
    if (!prev) current = ll;
    if (prev)
      prev.next = ll;
    prev = ll;
    map[cup] = ll;
  });
  prev.next = current;
  
  for (let i = 0; i < 10000000; i++) {
    let pickedCups = [];
    let leftEnd = current;
    for (let j = 0; j < 3; j++) {
      pickedCups.push(leftEnd.next.val);
      leftEnd = leftEnd.next;
    }
    
    current.next = leftEnd.next;

    let destination = current.val - 1;
    if (destination < smallest)
        destination = biggest;
    while (pickedCups.includes(destination)) {
      destination--;
      if (destination < smallest)
        destination = biggest;
    }
    
    let rightEnd = map[destination].next;
    map[destination].next = map[pickedCups[0]];
    map[pickedCups[2]].next = rightEnd;

    current = current.next;
  }

  return map[1].next.val * map[1].next.next.val;
};

let answer = getAnswer();
console.log(answer);