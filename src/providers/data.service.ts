import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { create, inserts } from './data/cities.sql';


@Injectable()
export class DataService {
  db: SQLiteObject;

  constructor(private sqlite: SQLite) {
  }

  public async prepareDatabase() {
    this.db = await this.createDataBase();
    console.log('db', this.db);
    if (this.db) {
      this.populate();
    }
  }

  private async createDataBase() {
    try {
      let db = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });
      console.log('SQL: Database created');
      return db;
    }
    catch (e) {
      console.log(e);
    }
  }

  private async populate() {
    let data = await this.db.executeSql('select COUNT(id) as qtd from cidades', {})    
    if (data.rows.item(0).qtd == 0) {
      try {        
        await this.db.sqlBatch([
          create,
          ...inserts.map(t => [t, []])]);
        console.log('Populated database OK');
      }
      catch (error) {
        console.log('SQL batch ERROR: ' + error.message);
      }
    }
  }
}
