import { curry } from './curry.js';

const odd = (v) => v % 2 === 1;

const even = (v) => v % 2 === 0;

const add = curry((a, b) => a + b);

const minus = curry((a, b) => a - b);

const mul = curry((a, b) => a * b);

const div = curry((a, b) => a / b);

const divr = curry((a, b) => b / a);

const mod = curry((a, b) => a % b);

const rema = curry((a, b) => {
	const r = a % b;
	return r < 0 ? r + b : r;
});

const power = curry((a, b) => a ** b);

const negate = (a) => -a;

const under = () => (a, b) => a < b ? -1 : a > b ? 1 : 0;

const upper = () => (a, b) => a > b ? -1 : a < b ? 1 : 0;

const sort = curry((rule, arr) => {
	if (rule != undefined) return arr.sort(rule);
	else return arr.sort();
});

function median(arr) {
	const sortedArr = [...arr].sort((a, b) => a - b);
	const mid = Math.floor(sortedArr.length / 2);
	return sortedArr.length % 2 !== 0 ? sortedArr[mid] : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
}

function sum(arr) {
	return arr.reduce((x, y) => x + y);
}

function prod(arr) {
	return arr.reduce((x, y) => x * y);
}

const max = (arr) => Math.max(...arr);

const min = (arr) => Math.min(...arr);

function average(arr) {
	return sum(arr) / arr.length;
}

function inc(x) {
	return x + 1;
}

function dec(x) {
	return x - 1;
}

export {
	odd,
	even,
	add,
	minus,
	mul,
	div,
	divr,
	mod,
	rema,
	power,
	sort,
	upper,
	under,
	sum,
	prod,
	negate,
	average,
	median,
	max,
	min,
	inc,
	dec
};
