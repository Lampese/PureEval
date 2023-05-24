/* eslint-disable no-case-declarations */
import { Just } from './abstract/maybe.js';
import { curry } from './curry.js';
import { summon } from './summon.js';

function _assoc(pos, val, obj) {
	if (Array.isArray(obj)) {
		const arr = [...obj];
		arr[pos] = val;
		return arr;
	}
	return { ...obj, [pos]: val };
}

const _shallowCloneObject = (pos, obj) => Number.isInteger(pos) && Array.isArray(obj) ? [...obj] : { ...obj };

const _dissoc = (pos, obj) => {
	if (Number.isInteger(pos) && Array.isArray(obj)) {
		const result = [...obj];
		result.splice(pos, 1);
		return result;
	}
	const newObj = { ...obj };
	delete newObj[pos];
	return newObj;
};

const prop = curry((s, a) => Array.isArray(s) ? s.reduce((acc, cur) => acc && acc[cur], a) : a[s]);

const assoc = curry((s, v, a) => {
	if (Array.isArray(s)) {
		const idx = s[0];
		const nextObj =
			!Just(a).isNothing() && Object.prototype.hasOwnProperty.call(a, idx)
				? a[idx]
				: Number.isInteger(s[1])
					? []
					: {};
		v = s.length > 1 ? assoc(Array.prototype.slice.call(s, 1), v, nextObj) : v;
		return _assoc(idx, v, a);
	} else return _assoc(s, v, a);
});

const modify = curry((s, f, a) => {
	if (Array.isArray(s)) {
		const [head, ...tail] = s;
		return tail.length === 0
			? assoc(head, f(a[head]), a)
			: assoc(head, modify(tail, f, a[head]), a);
	} else {
		return assoc(s, f(a[s]), a);
	}
});

const dissoc = curry((s, a) => {
	if (Array.isArray(s)) {
		if (s.length === 0) return a;
		const [head, ...tail] = s;
		if (tail.length === 0) return _dissoc(head, a);
		else {
			const nextObj = a[head] == null ? _shallowCloneObject(head, a) : a[head];
			return assoc(head, dissoc(tail, nextObj), a);
		}
	} else {
		return _dissoc(s, a);
	}
});

const deepClone = (obj) => {
	if (obj === null) return null;
	if (typeof obj !== 'object') return obj;
	if (obj instanceof RegExp) return new RegExp(obj);
	if (obj instanceof Date) return new Date(obj);
	const newObj = new obj.constructor();
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			newObj[key] = deepClone(obj[key]);
		}
	}
	return newObj;
};

const keys = (x) => Object.keys(x);

const valuesIn = (x) => Object.values(x);

const makePair = (arr) => Object.fromEntries(arr);

const construct = (cls) => curry(summon(cls.constructor.length, (...args) => new cls(...args)));

const has = curry((prop, obj) => Object.prototype.hasOwnProperty.call(obj, prop));

export { prop, assoc, modify, dissoc, deepClone, keys, valuesIn, makePair, construct, has };
