function factorial(anyNumber){  
    let num = 1;

    for (let i = anyNumber; i > 0; i--) {
        num *= i;
    }
    return num;
}

console.log(factorial(5))
console.log(factorial(4))
console.log(factorial(1))