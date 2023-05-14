function swapSentence(sentence, before, after) {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].toLowerCase() === before.toLowerCase()) {
        if (words[i][0] === words[i][0].toUpperCase()) {
          words[i] = after.charAt(0).toUpperCase() + after.slice(1);
        } else {
          words[i] = after.toLowerCase();
        }
      }
    }
    return words.join(" ");
}


const replaceThis = swapSentence('It has been Raining today', 'raining', 'sunny');
console.log(replaceThis);

