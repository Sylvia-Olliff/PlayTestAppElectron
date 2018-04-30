'use strict';
import { WEAPONS, CLASSES, RACES, FEATS, ARMOR, SHIELDS, STATUS_EFFECTS } from './Utils/Constants';
/**
 * Creature base
 * @abstract
 */
export default class Creature {
  /**
 * @param {!string} name                     - Creature Name used for reporting purposes
 * @param {object}  stats                    - Creature Base Attributes
 * @param {!number} stats.STR                - Strength
 * @param {!number} stats.DEX                - Dexterity 
 * @param {!number} stats.CON                - Consititution
 * @param {!number} stats.INT                - Intelligence
 * @param {!number} stats.WIS                - Wisdom
 * @param {!number} stats.CHA                - Charisma
 * @param {object}  details                  - details (Class and Equipment)
 * @param {Class}   details.Class            - Class (Monster or Character)
 * @param {Race}    details.Race             - Race (either Player or Monster)
 * @param {object}  details.Equipment        - Equipment (Weapons and Armor)
 * @param {Weapon}  details.Equipment.Weapon - Weapons
 * @param {Armor}   details.Equipment.Armor  - Armor (includes shields)
 */
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

    // These are modified by statusEffects and used to calculate current saves and checks
    this.modFORT = 0;
    this.modREF = 0;
    this.modWILL = 0;

    // Resistances and Immunities (these are initialized for prototyping)
    this.dmgResist = {};
    this.dmgTypeResist = {};
    this.dmgTypeImmune = [];
    this.spellResist;

    // health stuff
    this.maxHP;
    this.currentHP

    // Basic Attack Bonus
    this.BAB;

    this.statusEffects = [];

    // A list of all values that must be set before this Creature is ready for use. 
    this.readyCheckList = {
      stats: true,
      class: false,
      equipment: false,
      race: false
    }

    for (let stat of stats) {
      if (!stat) this.readyCheckList.stats = false; return;
    }

    let creature = this;
    if (details) {
      if (details.Class) {
        if (CLASSES.includes(details.Class.name)) { 
          creature.Class = details.Class;
          creature.Class.init(creature);
          // let hitpoints = 0;
          // for (let i = 0; i < this.Class.hitDice; i += 1) {
          //   hitpoints += Math.floor(Math.random * this.Class.hitDiceType) + 1;
          // }
          // this.HP = hitpoints;
          // this.currentHP = this.HP;
          // this.BAB = this.Class.BAB;
        }
      }
      if (details.Equipment) {
        const equip = details.Equipment;
        if (equip.Armor && ARMOR.includes(equip.Armor.name)) {
          creature.Armor = equip.Armor;
        }
        if (equip.Weapon && WEAPONS.include(equip.Weapon.name)) {
          creature.Weapon = equip.Weapon;
        }
        if (equip.Shield && SHIELDS.include(equip.Shield.name)) {
          creature.Shield = equip.Shield;
        }
      }
      if (details.Weapon && !creature.Weapon) {
        if (details.Weapon && creature.Class) {
          if (WEAPONS.includes(details.Weapon.name) && creature.Class.acceptedWeapons.includes(details.Weapon.name)) {
            creature.Weapon = details.Weapon;
          } else {
            creature.Weapon = null;
            creature.InvalidWeapon = true;
          }
        } else if (WEAPONS.includes(details.Weapon.name)) creature.Weapon = details.Weapon;
      }
      if (details.Race) {
        if (RACES.includes(details.Race.name)) {
          creature.Race = details.Race;
          creature.Race.init(creature);
          // if (this.Race.statIncreases.length > 0) {
          //   for (let statInc in this.Race.statIncreases) {
          //     this[statInc] += this.Race.statIncreases[statInc]
          //   }
          // }
          // if (this.Race.statDecreases.length > 0) {
          //   for (let statDec in this.Race.statDecreases) {
          //     this[statDec] -= this.Race.statDecreases[statDec]
          //   }
          // }
          // if (this.Race.NatArmor && this.Race.NatArmor > 0) {
          //   if (this.Armor) this.Armor.NatArmor += this.Race.NatArmor;
          //   else this.Armor = { NatArmor: this.Race.NatArmor };
          // }
        } else {
          creature.Race = null;
          creature.InvalidRace = true;
        }
      }
      // TODO: Test for feat prereqs being met
      if (details.Feats) {
        creature.Feats = [];
        details.Feats.forEach(element => {
          if (FEATS.includes(element.name)) creature.Feats.push(element);
          else if (creature.InvalidFeatsList) {
            creature.InvalidFeatsList.push(element);
          } else {
            creature.InvalidFeatsList = [];
            creature.InvalidFeatsList.push(element);
          }
        });
        if (creature.Feats.length < 1) {
          creature.InvalidFeats = true;
          creature.Feats = null;
        }
      }
      if (details.Armor && !creature.Armor) {
        creature.Armor = details.Armor;
      }
    }
  }

  get stats() {
    let creature = this;
    return () => { 
      return {
        STR: creature.totalSTR,
        DEX: creature.totalDEX,
        CON: creature.totalCON,
        INT: creature.totalINT,
        WIS: creature.totalWIS,
        CHA: creature.totalCHA
      };
    }
  }

  /**
   * 
   * @param {!string} stat - stat name
   * @param {!number} value 
   */
  setStat(stat, value) {
    const statName = `total${stat}`;
    if (this[statName]) this[statName] = value;
  }

  get saves() {
    let creature = this;
    return () => {
      return {
        FORT: creature.FORT + creature.modFORT + creature.statBonus('CON'),
        REF: creature.REF + creature.modREF + creature.statBonus('DEX'),
        WILL: creature.WILL + creature.modWILL + creature.statBonus('WIS')
      }
    };
  }

  /**
   * 
   * @param {!string} stat - stat name 
   */
  statBonus(stat) {
    const statName = `total${stat}`;
    let creature = this;
    return () => {
      if (creature[statName]) { 
        return { bonus: (creature[statName] / 2) - 5 };
      } 
      return { bonus: false };
    };
  }

  /**
   * 
   * @param {!string} stat - stat name
   * @param {!number} value - increment amount
   */
  incrementStat(stat, value) {
    const statName = `total${stat}`;
    if(this[statName]) this[statName] += value;
  }

  /**
   * 
   * @param {!string} stat - stat name
   * @param {!number} value - decrement amount
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
   * @param {!string} type - (standard, flat, touch)
   */
  armorClass(type) {
    let creature = this;
    return () => {
      let armorClass = 10;
      
      switch (type.toLowerCase()) {
        case 'standard':    
          if (creature.Armor) {
            armorClass += creature.Armor.Value;
            armorClass += creature.Armor.NatArmor;
            if (creature.Armor.MaxDex) {
              if (creature.statusEffects.dodgeACBonus) {
                if ((creature.statBonus('DEX') + creature.statusEffects.dodgeACBonus) < creature.Armor.MaxDex) {
                  armorClass += creature.statBonus('DEX');
                  armorClass += creature.statusEffects.dodgeACBonus;
                } else {
                  armorClass += creature.Armor.MaxDex;
                }
              } else {
                if (creature.statBonus('DEX') < creature.Armor.MaxDex) {
                  armorClass += creature.statBonus('DEX');
                } else {
                  armorClass += creature.Armor.MaxDex;
                }
              }
            } else {
              if (creature.statusEffects.dodgeACBonus) armorClass += creature.statusEffects.dodgeACBonus;
              armorClass += creature.statBonus('DEX');
            }
            armorClass += creature.Armor.ShieldValue;
          } else {
            armorClass += creature.statBonus('DEX');
          }
          if (creature.statusEffects.defACBonus) armorClass += creature.statusEffects.defACBonus;
          break;
        
        case 'flat':
          if (creature.Armor) {
            armorClass += creature.Armor.Value;
            armorClass += creature.Armor.NatArmor;
            armorClass += creature.Armor.ShieldValue;
            if (creature.statusEffects.defACBonus) armorClass += creature.statusEffects.defACBonus;
          }
          break;
  
        case 'touch':
          armorClass += creature.statBonus('DEX');
          if (creature.statusEffects.defACBonus) armorClass += creature.statusEffects.defACBonus;
          if (creature.statusEffects.dodgeACBonus) armorClass += creature.statusEffects.dodgeACBonus;
          break;
      }
      return armorClass;
    }
  }

  /**
   * 
   * @param {Object<string, any>} StatusEffect 
   */
  addStatusEffect(StatusEffect) {
    if (STATUS_EFFECTS.includes(StatusEffect)) {
      StatusEffect.immediateTick(creature);
      this.statusEffects.push(StatusEffect);
    }
  }

  /**
   * Increment all current status effects
   */
  statusRoundTick() {
    let creature = this;
    return new Promise((resolve, reject) => {
      const tasks = creature.statusEffects.map(async (status) => {
        if (status.duration > 1) {
          status.roundTick(creature);
          status.duration -= 1;
        } else if (status.duration === 1) {
          status.finalTick(creature);
          status.duration -= 1;
        }
        return status;
      });

      Promise.all(tasks).then((result) => {
        console.log(result);
        resolve();
      })
    });
  }

  /**
   * 
   * @param {object}  dmg - damage object
   * @param {!string} dmg.type - primary damage type
   * @param {!number} dmg.amount - amount of damage
   */
  takeDamage(dmg) {
    let damageTaken = 0;
    if(this.dmgTypeImmune[dmg.type]) return;
    if(this.dmgTypeResist[dmg.type]) {
      if (this.dmgTypeResist[dmg.type].amount < 1) {
        damageTaken += dmg.amount - ( this.dmgTypeResist[dmg.type].amount * dmg.amount );
      } else {
        damageTaken += dmg.amount - this.dmgTypeResist[dmg.type].amount;
      }
    }
    if(this.dmgResist && this.dmgResist.negationType !== dmg.type) {
      damageTaken -= this.dmgResist.amount;
    }
    if (damageTaken > 0 && !(damageTaken < 1)) {
      this.currentHP -= damageTaken;
    }
  }
}