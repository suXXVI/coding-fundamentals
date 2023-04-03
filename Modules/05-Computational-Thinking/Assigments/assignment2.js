function perimeter (letter, number) {
    return letter === 's' ? 4 * number : letter === 'c' ? 6.28 * number : null
}

console.log(perimeter('s', 7))
console.log(perimeter('c', 4))
console.log(perimeter('c', 9))