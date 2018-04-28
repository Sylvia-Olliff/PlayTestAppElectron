'use strict';
import { WEAPONS, CLASSES, RACES, FEATS, ARMOR, SHIELDS, STATUS_EFFECTS } from './Utils/Constants';
/**
 * @param {string} name                     - Creature Name used for reporting purposes
 * @param {Object} stats                    - Creature Base Attributes
 * @param {int}    stats.STR                - Strength
 * @param {int}    stats.DEX                - Dexterity 
 * @param {int}    stats.CON                - Consititution
 * @param {int}    stats.INT                - Intelligence
 * @param {int}    stats.WIS                - Wisdom
 * @param {int}    stats.CHA                - Charisma
 * @param {Object} details                  - details (Class and Equipment)
 * @param {Class}  details.Class            - Class (Monster or Character)
 * @param {Race}   details.Race             - Race (either Player or Monster)
 * @param {Object} details.Equipment        - Equipment (Weapons and Armor)
 * @param {Weapon} details.Equipment.Weapon - Weapons
 * @param {Armor} details.Equipment.Armor   - Armor (includes shields)
 */
export default class Creature {
  constructor(name, stats, details) {
    this.name = name;

    // Starting Stats. These are only changed if permanent stat damage/increase occur.
    this.STR = stats.STR;
    this.DEX = stats.DEX;
    this.CON = stats.CON;
    this.INT = stats.INT;
    this.WIS = stats.WIS;
    this.CHA = stats.CHA;

    //These are modified by statusEffects and used to calculate current saves and checks
    this.totalSTR = this.STR;
    this.totalDEX = this.DEX;
    this.totalCON = this.CON;
    this.totalINT = this.INT;
    this.totalWIS = this.WIS;
    this.totalCHA = this.CHA;

    //These are modified by statusEffects and used to calculate current saves and checks
    this.modFORT = 0;
    this.modREF = 0;
    this.modWILL = 0;

    this.statusEffects = [];

    // A list of all values that must be set before this Creature is ready for use. 
    this.readyCheckList = {
      stats: true,
      class: false,
      equipment: false,
      race: false
    }

    if (details) {
      if (details.Class) {
        if (CLASSES.includes(details.Class.name)) { 
          this.Class = details.Class;
          let hitpoints = 0;
          for (let i = 0; i < this.Class.hitDice; i += 1) {
            hitpoints += Math.floor(Math.random * this.Class.hitDiceType) + 1;
          }
          this.HP = hitpoints;
          this.BAB = this.Class.BAB;
        }
      }
      if (details.Equipment) {
        const equip = details.Equipment;
        if (equip.Armor && ARMOR.includes(equip.Armor.name)) {
          this.Armor = equip.Armor;
        }
        if (equip.Weapon && WEAPONS.include(equip.Weapon.name)) {
          this.Weapon = equip.Weapon;
        }
        if (equip.Shield && SHIELDS.include(equip.Shield.name)) {
          this.Shield = equip.Shield;
        }
      }
      if (details.Weapon && !this.Weapon) {
        if (details.Weapon && this.Class) {
          if (WEAPONS.includes(details.Weapon.name) && this.Class.acceptedWeapons.includes(details.Weapon.name)) {
            this.Weapon = details.Weapon;
          } else {
            this.Weapon = null;
            this.InvalidWeapon = true;
          }
        } else if (WEAPONS.includes(details.Weapon.name)) this.Weapon = details.Weapon;
      }
      if (details.Race) {
        if (RACES.includes(details.Race)) {
          this.Race = details.Race.name;
          if (this.Race.statIncreases.length > 0) {
            for (let statInc in this.Race.statIncreases) {
              this[statInc] += this.Race.statIncreases[statInc]
            }
          }
          if (this.Race.statDecreases.length > 0) {
            for (let statDec in this.Race.statDecreases) {
              this[statDec] -= this.Race.statDecreases[statDec]
            }
          }
          if (this.Race.NatArmor && this.Race.NatArmor > 0) {
            if (this.Armor) this.Armor.NatArmor += this.Race.NatArmor;
            else this.Armor = { NatArmor: this.Race.NatArmor };
          }
        } else {
          this.Race = null;
          this.InvalidRace = true;
        }
      }
      // TODO: Test for feat prereqs being met
      if (details.Feats) {
        this.Feats = [];
        details.Feats.forEach(element => {
          if (FEATS.includes(element.name)) this.Feats.push(element);
          else if (this.InvalidFeatsList) {
            this.InvalidFeatsList.push(element);
          } else {
            this.InvalidFeatsList = [];
            this.InvalidFeatsList.push(element);
          }
        });
        if (this.Feats.length < 1) {
          this.InvalidFeats = true;
          this.Feats = null;
        }
      }
      if (details.Armor && !this.Armor) {
        this.Armor = details.Armor;
      }
    }
  }

  get stats() {
    return () => { 
      return {
        STR: this.totalSTR,
        DEX: this.totalDEX,
        CON: this.totalCON,
        INT: this.totalINT,
        WIS: this.totalWIS,
        CHA: this.totalCHA
      };
    }
  }

  /**
   * 
   * @param {string} stat - stat name
   * @param {int} value 
   */
  setStat(stat, value) {
    const statName = `total${stat}`;
    if (this[statName]) this[statName] = value;
  }

  get saves() {
    return () => {
      return {
        FORT: this.FORT + this.modFORT + this.statBonus('totalCON'),
        REF: this.REF + this.modREF + this.statBonus('totalDEX'),
        WILL: this.WILL + this.modWILL + this.statBonus('totalWIS')
      }
    };
  }

  /**
   * 
   * @param {string} stat - stat name 
   */
  statBonus(stat) {
    const statName = `total${stat}`;
    return () => {
      if(this[statName]) { 
        return { bonus: (this[statName] / 2) - 5 };
      } 
      return { bonus: false };
    };
  }

  /**
   * 
   * @param {string} stat - stat name
   * @param {int} value - increment amount
   */
  incrementStat(stat, value) {
    const statName = `total${stat}`;
    if(this[statName]) this[statName] += value;
  }

  /**
   * 
   * @param {string} stat - stat name
   * @param {int} value - decrement amount
   */
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

  /**
   * 
   * @param {string} type - (standard, flat, touch)
   */
  armorClass(type) {
    return () => {
      let armorClass = 10;
      
      switch (type.toLowerCase()) {
        case 'standard':    
          if (this.Armor) {
            armorClass += this.Armor.Value;
            armorClass += this.Armor.NatArmor;
            if (this.Armor.MaxDex) {
              if (this.statusEffects.dodgeACBonus) {
                if ((this.statBonus('DEX') + this.statusEffects.dodgeACBonus) < this.Armor.MaxDex) {
                  armorClass += this.statBonus('DEX');
                  armorClass += this.statusEffects.dodgeACBonus;
                } else {
                  armorClass += this.Armor.MaxDex;
                }
              } else {
                if (this.statBonus('DEX') < this.Armor.MaxDex) {
                  armorClass += this.statBonus('DEX');
                } else {
                  armorClass += this.Armor.MaxDex;
                }
              }
            } else {
              if (this.statusEffects.dodgeACBonus) armorClass += this.statusEffects.dodgeACBonus;
              armorClass += this.statBonus('DEX');
            }
            armorClass += this.Armor.ShieldValue;
          } else {
            armorClass += this.statBonus('DEX');
          }
          if (this.statusEffects.defACBonus) armorClass += this.statusEffects.defACBonus;
          break;
        
        case 'flat':
          if (this.Armor) {
            armorClass += this.Armor.Value;
            armorClass += this.Armor.NatArmor;
            armorClass += this.Armor.ShieldValue;
            if (this.statusEffects.defACBonus) armorClass += this.statusEffects.defACBonus;
          }
          break;
  
        case 'touch':
          armorClass += this.statBonus('DEX');
          if (this.statusEffects.defACBonus) armorClass += this.statusEffects.defACBonus;
          if (this.statusEffects.dodgeACBonus) armorClass += this.statusEffects.dodgeACBonus;
          break;
      }
      return armorClass;
    }
  }

  /**
   * 
   * @param {StatusEffect} StatusEffect 
   */
  addStatusEffect(StatusEffect) {
    if (STATUS_EFFECTS.includes(StatusEffect)) {
      StatusEffect.immediateTick(this);
      this.statusEffects.push(StatusEffect);
    }
  }

  statusRoundTick() {
    return new Promise((resolve, reject) => {
      const tasks = this.statusEffects.map( async (status) => {
        if (status.duration > 1) {
          status.roundTick(this);
          status.duration -= 1;
        } else if (status.duration === 1) {
          status.finalTick(this);
          status.duration -= 1;
        }
        return status;
      });
    });
  }
}