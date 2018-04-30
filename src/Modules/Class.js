'use strict';

/**
 * Class base
 * @abstract
 */
export default class Class {
    /**
     * 
     * @param {string} name - Class Name
     * @param {number} hitDie - Hit die size (d4, d6, etc...)
     * @param {number} level - Starting level
     * @param {number} BAB - Base Attack Bonus
     * @param {object} saves 
     * @param {number} saves.FORT - Fortitude
     * @param {number} saves.REF - Reflex
     * @param {number} saves.WILL - Will
     * @param {Array<string>} weaponTypes - Allowed weapon types
     * @param {Array<string>} armorTypes - Allowed armor types
     */
    constructor(name, hitDie, level, BAB, saves, weaponTypes, armorTypes) {
        this.name = name;
        this.hitDie = hitDie;
        this.level = level;
        this.BAB = BAB;
        this.FORT = saves.FORT;
        this.REF = saves.REF;
        this.WILL = saves.WILL;
        this.weaponTypes = weaponTypes;
        this.armorTypes = armorTypes;
    }
}