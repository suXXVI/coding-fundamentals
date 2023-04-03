//Assignment 1

function sum(n) {
    let total = 0;

    for (let i = 0; i < n.length; i++) {
        total += n[i]
    }
    return total
}

total = sum([1, 2, 3, 4]);
// total = sum([-3, 5, 19, -6]);
console.log(total)
