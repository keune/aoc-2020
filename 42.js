const fs = require('fs');

const intersect = (a, b) => {
  return a.filter(elA => b.includes(elA));
};

const diff = (a, b) => {
  return a.filter(elA => !b.includes(elA));
};

const uniq = arr => {
  return arr.filter((el, i) => arr.indexOf(el) === i);
};

const getAnswer = () => {
  let data = fs.readFileSync('./inputs/21.txt', 'utf8');
  data = data.split("\n");

  let allergenPossibles = new Map();

  for (let i = 0; i < data.length; i++) {
    let line = data[i];
    let allergenFullPart = line.match(/\(.+\)/)[0];
    let allergens = allergenFullPart
      .replace('(', '')
      .replace(')', '')
      .replace('contains', '')
      .trim()
      .split(', ');
    let ingredients = line.replace(allergenFullPart, '').trim().split(' ');

    allergens.forEach(allergen => {
      let possibles = allergenPossibles.get(allergen);
      if (!possibles) {
        possibles = ingredients;
      } else {
        possibles = intersect(possibles, ingredients);
      }
      allergenPossibles.set(allergen, possibles);
    });
  }
  let allAllergens = [...allergenPossibles.keys()];

  while (true) {
    let hasSingleMatchAsCouple = [...allergenPossibles.entries()].filter(couple => couple[1].length === 1);
    let changedSomething = false;
    hasSingleMatchAsCouple.forEach(couple => {
      let allergen = couple[0];
      let singleMatchIngredient = couple[1][0];
      diff(allAllergens, [allergen]).forEach(fixAllergen => {
        let possibleIngredients = allergenPossibles.get(fixAllergen);
        let len1 = possibleIngredients.length;
        possibleIngredients = diff(possibleIngredients, [singleMatchIngredient]);
        let len2 = possibleIngredients.length;
        allergenPossibles.set(fixAllergen, possibleIngredients);
        if (len1 != len2)
          changedSomething = true;
      });
    });
    if (!changedSomething) break;
  }

  return [...allergenPossibles.entries()]
    .sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }).map(el => el[1][0]).join(',');
};

let answer = getAnswer();
console.log(answer);