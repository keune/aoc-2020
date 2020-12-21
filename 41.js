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

  let ingredientCount = new Map();
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
    ingredients.forEach(ingredient => {
      let count = ingredientCount.get(ingredient) || 0;
      count++;
      ingredientCount.set(ingredient, count);
    });

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
  let allIngredients = [...ingredientCount.keys()];

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

  let allPossibleIngredients = [...allergenPossibles.values()];
  allPossibleIngredients = uniq(allPossibleIngredients.flat());

  let leftIngredients = diff(allIngredients, allPossibleIngredients);
  return leftIngredients.reduce((sum, ing) => sum + ingredientCount.get(ing), 0);
};

let answer = getAnswer();
console.log(answer);