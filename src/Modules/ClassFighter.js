import Class from "./Class";
import { rollDice } from "./Utils/Tools";

'use strict';

export default class Fighter extends Class {
    /**
     * 
     * @param {object} base 
     * @param {number} base.hitDie - Hit die size (d4, d6, etc...)
     * @param {number} base.level - Starting level
     * @param {number} base.BAB - Base Attack Bonus
     * @param {object} base.saves
     * @param {number} base.saves.FORT - Fortitude
     * @param {number} base.saves.REF - Reflex
     * @param {number} base.saves.WILL - Will
     * @param {Array<string>} base.weaponTypes - Allowed weapon types
     * @param {Array<string>} base.armorTypes - Allowed armor types
     */
    constructor(base) {
        base.name = 'Fighter';
        super(base);
    }

    /**
     * Initialize the creature with this Class
     * @param {object} Creature - instance of Creature this class has been assigned to
     */
    init(Creature) {
        let fighter = this;
        return new Promise((resolve, reject) => {
            Creature.maxHP = rollDice(fighter.level - 1, fighter.hitDie, Creature.statBonus('CON'));
            Creature.maxHP += fighter.hitDie;
        });
    }
}