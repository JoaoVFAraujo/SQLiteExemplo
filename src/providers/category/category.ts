import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoryProvider {

  constructor(
    private dbProvider: DatabaseProvider) {

  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SlELECT * FROM categories';

        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let categories: any[] = [];

              for (let i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                categories.push(product)
              }

              return categories;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(JSON.stringify(e)))

      })
      .catch((e) => console.error(JSON.stringify(e)))
  }

}
