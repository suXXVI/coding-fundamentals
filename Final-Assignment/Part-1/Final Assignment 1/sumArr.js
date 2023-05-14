function sumArr(num) {
    let total = 0;

    for (let i = 0; i < num.length; i++) {
        total += num[i]
    }
    return total;
}

console.log(sumArr([1,2,3,4,5]));
console.log(sumArr([1000,2000,44,55,22]));
console.log(sumArr([123,456,789]));