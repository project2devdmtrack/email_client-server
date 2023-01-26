import { IMessage } from '../interfaces/messages';

function mergeSortedArray(a: [], b: []) {
    var sorted: [] = [],
        indexA = 0,
        indexB = 0;

    while (indexA < a.length && indexB < b.length) {
        if (sortFn(a[indexA], b[indexB]) > 0) {
            sorted.push(b[indexB++]);
        } else {
            sorted.push(a[indexA++]);
        }
    }

    if (indexB < b.length) {
        sorted: [] = sorted.concat(b.slice(indexB));
    } else {
        sorted: [] = sorted.concat(a.slice(indexA));
    }

    return sorted;
}

function sortFn(a: number, b: number) {
    return a - b;
}

export { mergeSortedArray };
