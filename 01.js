const fs = require('fs');

const getAnswer = () => {
	let data = fs.readFileSync('./inputs/01.txt', 'utf8');
	data = data.split("\n").map(n => +n).sort((a,b) => a-b);
	for (let i = 0; i < data.length - 1; i++) {
		let first = data[i];
		for (let j = i+1; j < data.length; j++) {
			let second = data[j];
			let sum = first + second;
			if (sum === 2020)
				return first * second;
			if (sum > 2020) {
				break;
			}
		}
	}
	return false;
};

let answer = getAnswer();
console.log(answer);