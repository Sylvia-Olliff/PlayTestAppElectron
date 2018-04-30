'use strict';

/**
 * Weapon base
 * @abstract
 */
export default class Weapon {
    /**
     * 
     * @param {!string} name - Name of the weapon
     * @param {!string} type - Type of weapon (martial, exotic, simple)
     * @param {!number} diceType - Damage die type (d4, d6, etc...)
     * @param {!number} diceNum - Number of dice
     * @param {!string} damageType - Damage type
     * @param {!number} hands - Number of hands necessary to wield the weapon
     * @param {object} crit - Critical threat info
     * @param {!number} crit.bottom - minimum for crit threat
     * @param {number} crit.top - Max for crit threat
     * @param {!mumber} crit.mult - critical damage multiplier
     */
    constructor(name, type, diceType, diceNum, damageType, hands, crit) {
        this.name = name;
        this.type = type;
        this.diceType = diceType;
        this.diceNum = diceNum;
        this.damageType = damageType;
        this.hands = hands;
        this.critBottom = crit.bottom;
        this.critTop = (crit.top) ? crit.top : 20;
        this.critMult = crit.mult;

        this.Enhancements = [];
    }
}