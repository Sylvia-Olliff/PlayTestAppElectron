import Weapon from "./Weapon";
import { rollDice } from "./Utils/Tools";

'use strict';

/**
 * Non-Magical Melee Weapon
 * @extends Weapon
 */
export default class WeaponMelee extends Weapon {
    /**
     * 
     * @param {object}  base
     * @param {!string} base.name - Weapon Name
     * @param {!string} base.type - Weapon Type (martial, simple, exotic)
     * @param {!number} base.diceType - Dice type (d4, d6, etc...)
     * @param {!number} base.diceNum - Number of dice
     * @param {!string} base.damageType - Damage type (slashing, piercing, etc...)
     * @param {!number} base.hands - number of hands necessary for weapon
     * @param {object}  base.crit
     * @param {!number} base.crit.bottom - minimum crit threat range
     * @param {number}  base.crit.top - maximum crit threat range
     * @param {!number} base.crit.mult - crit multiplier 
     */
    constructor(base) {
        super(base.name, base.type, base.diceType, base.diceNum, base.damageType, base.hands, base.crit);
    }

    /**
     * 
     * @param {!number} statVal - associated stat bonus
     * @param {string} hand - ('main', 'off', or 'two')
     * @param {number} roll - Attack roll value (used to determine if crit)
     */
    doDamage(statVal, hand, roll) {
        let isCrit = (roll >= this.critBottom && roll <= this.critTop);
        switch(hand.toLowerCase()) {
            case 'main':
                return rollDice((isCrit) ? (this.diceNum * this.critMult) : this.diceNum, this.diceType, statVal);
            case 'off':
                return rollDice((isCrit) ? (this.diceNum * this.critMult) : this.diceNum, this.diceType, (statVal / 2));
            case 'two':
                return rollDice((isCrit) ? (this.diceNum * this.critMult) : this.diceNum, this.diceType, (statVal * 1.5));
            default:
                throw new Error('Invalid weapon hand');
        }
    }

    addEnhancement(Enhancement) {
        this.Enhancements.push(Enhancement);
        Enhancement.init(this);
    }

    removeEnhancement(EnhancementName) {
        let weapon = this;
        this.Enhancements.map(Enhancement => {
            if (Enhancement.name === EnhancementName) {
                Enhancement.unInit(weapon);
            } else {
                return Enhancement;
            }
        });
    }
}