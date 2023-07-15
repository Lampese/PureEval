import { curry } from './curry.js';

const zipWith = curry((f, a, b) => a.map((x, i) => f(x, b[i])));

const zip = zipWith((a, b) => [a, b]);

const join = curry((s, arr) => arr.join(s));

const slice = curry((start, end, arr) => arr.slice(start, end));

const take = curry((pos, arr) => arr.slice(0, pos));

const takeWhile = curry((f, arr) => {
	const index = arr.findIndex((item) => !f(item));
	return index === -1 ? arr : arr.slice(0, index);
});

const drop = curry((pos, arr) => arr.slice(pos));

const dropWhile = curry((f, arr) => {
	const index = arr.findIndex((item) => !f(item));
	return index === -1 ? [] : arr.slice(index);
});

const every = curry((f, arr) => arr.every(f));

const some = curry((f, arr) => arr.some(f));

const concat = curry((a, b) => (Array.isArray(a) ? a.concat(b) : a + b));

const head = (arr) => arr[0];

const tail = (arr) => arr[arr.length - 1];

const dropHead = ([_, ...tail]) => tail;

const dropTail = (arr) => arr.slice(0, -1);

const includes = curry((a, b) => b.includes(a));

const reverse = (arr) => arr.reduceRight((acc, cur) => [...acc, cur], []);

const count = curry((rule, arr) => arr.filter(rule).length);

const pairList = ([head, ...tail]) => [head, tail];

export {
	zipWith,
	zip,
	join,
	slice,
	take,
	takeWhile,
	drop,
	dropWhile,
	every,
	some,
	concat,
	head,
	tail,
	dropHead,
	dropTail,
	includes,
	reverse,
	count,
    pairList
};
