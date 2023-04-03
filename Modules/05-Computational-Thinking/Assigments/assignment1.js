function possibleBonus(a, b) {
    // since we cannot move backwards, if a is greater than b it returns false
    //since if both players are in the same position, the player rolling the dice would be moving away so if a is equal to b it returns false
    if (a > b || a === b) {
        return false
    }


    let distance = Math.abs(a - b);
    //since the dice has 6 sides, if a - b is greater than 6, it returns false since we will need two turns to reach the other player's position which is not possible since then itll be the other players turn and theyll be moving forward.
    if (distance <= 6) {
        return true
    } else {
        return false
    }
}

console.log(possibleBonus(3, 7))
console.log(possibleBonus(1, 9))
console.log(possibleBonus(5, 3))


// In a board game, a piece may advance 1-6 tiles forward depending on the number rolled on a six-sided dice. If you advance your piece onto the same tile as another player's piece, both of you earn a bonus.

// Can you reach your friend's tile number in the next roll? Create a function that takes your position a and your friend's position b and returns a boolean representation of whether it's possible to earn a bonus on any dice roll.


// You cannot move backward (which is why example #3 doesn't work).
// If you are already on the same tile, return false, as you would be advancing away.
// Expect only positive integer inputs.
