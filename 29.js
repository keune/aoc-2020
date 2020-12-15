const getAnswer = () => {
  let numbers = [9,19,1,6,0,5,4];
  let map = new Map();
  let prev = numbers[0];
  for (let i = 1; i < 2020; i++) {
    let cur = 0;
    if (i < numbers.length) {
      cur = numbers[i];
    } else {
      let last = map.get(prev);
      if (typeof last !== 'undefined') {
        cur = i - last - 1;
      }
    }

    map.set(prev, i - 1);
    prev = cur;
  }
  return prev;
};

let answer = getAnswer();
console.log(answer);