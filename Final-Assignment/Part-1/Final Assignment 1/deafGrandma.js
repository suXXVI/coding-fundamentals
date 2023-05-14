function deafGrandma(sentence) {
    let words = sentence.toUpperCase();
    let array = words.split(' ', sentence.length)
    let fromArr ='';

    array.forEach(element => {
        
        let result = `${element}!! `
        fromArr += result;

    })
    console.log(fromArr);
}

deafGrandma('I have a bad feeling about this');