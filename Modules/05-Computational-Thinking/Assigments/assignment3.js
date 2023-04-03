function generation(x, y) {
    const family = {
      ancestor: {
        father: 'father',
        grandfather: 'grandfather',
        'great grandfather': 'great grandfather',
        mother: 'mother',
        grandmother: 'grandmother',
        'great grandmother': 'great grandmother',
      },
      presentMale: {
        me: 'me!',
      },
      presentFemale: {
        me: 'me!',
      },
      descendant: {
        son: 'son',
        grandson: 'grandson',
        'great grandson': 'great grandson',
        daughter: 'daughter',
        granddaughter: 'granddaughter',
        'great granddaughter': 'great granddaughter',
      },
    };
    // incase of 0
    if (x === 0) {
        return 'me!'
    }

    if (x === -1 && y === 'f') {
        return family.ancestor.mother
    } else if (x === -2 && y === 'f') {
        return family.ancestor.grandmother
    } else if (x === -3 && y === 'f') {
        return family.ancestor['great grandmother']
    } else if (x === 1 && y === 'f') {
        return family.descendant.daughter
    } else if (x === 2 && y === 'f') {
        return family.descendant.granddaughter
    } else if (x=== 3 && y === 'f') {
        return family.descendant['great granddaughter']
    } else if (x === -1 && y === 'm') {
        return family.ancestor.father
    } else if (x === -2 && y === 'm') {
        return family.ancestor.grandfather
    } else if (x === -3 && y === 'm') {
        return family.ancestor['great grandfather']
    } else if (x === 1 && y === 'm') {
        return family.descendant.son
    } else if (x === 2 && y === 'm') {
        return family.descendant.grandson
    } else if (x=== 3 && y === 'm') {
        return family.descendant['great grandson']
    } else {
        return null
    }
}

console.log(generation(3, 'm'))