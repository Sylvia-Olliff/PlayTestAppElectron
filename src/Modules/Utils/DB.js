'use strict';
import Datastore from 'nedb';
import { app } from 'electron';
import path from 'path';

//TODO: add verification code for database contents.

const DB = {};
DB.weapons = new Datastore(path.resolve(app.getAppPath(), 'lib/weapons.db'));
DB.creatures = new Datastore(path.resolve(app.getAppPath(), 'lib/creatures.db'));
DB.enhancements = new Datastore(path.resolve(app.getAppPath(), 'lib/enhancements.db'));
DB.battleMaps = new Datastore(path.resolve(app.getAppPath(), 'lib/battleMaps.db'));
DB.tiles = new Datastore(path.resolve(app.getAppPath(), 'lib/tiles.db'));
DB.spells = new Datastore(path.resolve(app.getAppPath(), 'lib/spells.db'));

async function loadDB() {
  for (let item in DB) {
    await DB[item].loadDatabase();
  }
  return;
}

export default () => {
  return new Promise((resolve, reject) => {
    loadDB().then(() => {
      resolve(DB);
    });
  });
}
