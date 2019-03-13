import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  config: SQLiteDatabaseConfig

  constructor(
    private sqlite: SQLite) {

     this.config = {
        name: 'products.db',
        location: 'default'
      }

  }

  public getDB() {
    return this.sqlite.create(this.config)
  }

  public createDB() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);
      })
      .catch(e => console.log('ERROR CREATE DB', JSON.stringify(e)))
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS products (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
      .then((s) => console.log('TABELAS CRIADAS', JSON.stringify(s)))
      .catch(e => console.log('ERROR CRIAR TABLE', JSON.stringify(e)))
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', [])
      .then((data: any) => {
        // Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {
          
          // Criando as tabelas
          db.sqlBatch([
            ['insert into categories (name) values (?)', ['Hambúrgueres']],
            ['insert into categories (name) values (?)', ['Bebidas']],
            ['insert into categories (name) values (?)', ['Sobremesas']],
          ])
            .then((s) => console.log('DADOS INCLUIDOS', JSON.stringify(s)))
            .catch(e => console.log('ERROR INCLUIR DADOS', JSON.stringify(e)))
        }

      })
      .catch(e => console.log('ERROR AO CONSUTAR QTD DE CATEG', JSON.stringify(e)))
  }

}
