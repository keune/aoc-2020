const PRIME = 20201227;

const getLoopSize = (pk, sn) => {
  let loopSize = 0;
  let val = 1;
  while (true) {
    loopSize++;
    val *= sn;
    val = val % PRIME;
    if (val == pk)
      break;
  }
  return loopSize;
};

const getEK = (pk, loopSize) => {
  let val = 1;
  for (let i = 0; i < loopSize; i++) {
    val *= pk;
    val = val % PRIME;
  }
  return val;
};

(() => {
  let cardPK = 11349501;
  let doorPK = 5107328;

  let cardLoopSize = getLoopSize(cardPK, 7);
  let doorLoopSize = getLoopSize(doorPK, 7);

  console.log(getEK(cardPK, doorLoopSize));
  console.log(getEK(doorPK, cardLoopSize));
})();