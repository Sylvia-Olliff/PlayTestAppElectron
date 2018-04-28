'use strict';

class Creature {
    constructor(name, stats, saves, hitDiceType, hitDice, BAB, optionals) {
        this.name = name;

        this.STR = stats.STR;
        this.DEX = stats.DEX;
        this.CON = stats.CON;
        this.INT = stats.INT;
        this.WIS = stats.WIS;
        this.CHA = stats.CHA;

        this.baseFort = saves.FORT;
        this.baseRef = saves.REF;
        this.baseWill = saves.WILL;

        let hitpoints = 0;
        for (let i = 0; i < hitDice; i += 1) {
            hitpoints += Math.floor(Math.random * hitDiceType) + 1; 
        }
        this.HP = hitpoints;

        this.BAB = BAB;

        if (optionals) {
            if (optionals.Weapon) {
                if ()
            }
        }
    }

    get stats() {
        return {
            STR,
            DEX,
            CON,
            INT,
            WIS,
            CHA
        };
    }

    setStat(stat, value) {
        if (this[stat]) this[stat] = value;
    }

    statBonus(stat) {
        if(this[stat]) return ( this[stat] / 2 ) - 5;
        return false;
    }

    incrementStat(stat, value) {
        if(this[stat]) this[stat] += value;
    }

    decrementStat(stat, value) {
        if (this[stat]) {
            if(!((this[stat] - value) < 1)) {
                this[stat] -= value;
                return 'success';
            } else {
                return 'stat=zero';
            }
        } else {
            return false;
        }
    }
}