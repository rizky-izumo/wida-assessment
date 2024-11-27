function section3(l, t, min = 1) {
    let combinations = [];
    if (l === 1 && t <= 9) {
        combinations.push([t]);
    } else {
        for (let i = min; i < t / l && i <= 9; i++) {
            const arrays = section3(l - 1, t - i, i + 1);
            for (let j = 0; j < arrays.length; j++) {
                let array = arrays[j];
                array.splice(0, 0, i);
                combinations.push(array);
            }
        }
    }
    return combinations;
}

console.log(section3(3, 6));
console.log(section3(3, 8));
console.log(section3(4, 5));