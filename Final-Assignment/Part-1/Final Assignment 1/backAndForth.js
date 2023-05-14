function reverseThis(word) {
    let reversedString ='';
    
    for (let i = word.length -1; i >= 0; i--) {
        reversedString += word[i];
    }
    
    if (reversedString === word) {
        return true;
    } else {
        return false;
    };    
};

let string = reverseThis('racecar');
console.log(string);