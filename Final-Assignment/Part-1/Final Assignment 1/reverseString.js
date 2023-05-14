function reverse(word) {
    let reversedString ='';
    
    for (let i = word.length -1; i >= 0; i--) {
        reversedString += word[i];
    }
    return reversedString;    
}

console.log(reverse('abcde'));
console.log(reverse('hello'));
console.log(reverse('Greetings from The Hacker Collective'));