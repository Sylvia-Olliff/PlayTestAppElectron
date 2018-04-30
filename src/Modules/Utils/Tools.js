'use strict';

/**
 *  Roll a number of x-sided dice with optional bonus 
 * @param {!number} diceNum 
 * @param {!number} diceType 
 * @param {number} bonus 
 */
export const rollDice = (diceNum, diceType, bonus) => {
    let total = 0;
    for (let index = 0; index < diceNum; index++) {
        damage += Math.floor(Math.random * diceType) + 1;
    }
    if (bonus) damage += Math.ceil(bonus);
    return total;
}