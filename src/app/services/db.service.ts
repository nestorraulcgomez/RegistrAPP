import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private sqlite: SQLite) {
    this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql(
          'CREATE TABLE IF NOT EXISTS USUARIO (USER VARCHAR(30), PASS VARCHAR(30))',
          []
        )
          .then(() => {
            console.log('RGA: Tabla creada ok');
          })
          .catch((e) => {
            console.log('RGA: Tabla no ok');
          });
      })
      .catch((e) => {
        console.log('RGA: Base de datos no ok');
      });
  }


  almacenarUsuario(usuario, contrasena) {
    this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO USUARIO VALUES(?,?)', [usuario, contrasena, 0])
          .then(() => {
            console.log('RGA: Usuario Almacenado ok');
          })
          .catch((e) => {
            console.log('RGA: Usuario no Almacenado');
          });
      })
      .catch((e) => {
        console.log('RGA: Base de datos no ok');
      });
  }
  validarUsuario(usuario) {
    return this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql(
          'SELECT COUNT(USER) AS CANTIDAD FROM USUARIO WHEN USER = ?',
          [usuario]
        )
          .then((data) => {
            if (data.rows.item(0).CANTIDAD === 0) {
              return false;
            }
            return true;
          })
          .catch((e) => true);
      })
      .catch((e) => true);
  }
  modificarUsuario(usuario, contrasena) {
    return this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE USUARIO SET PASS = ? WHERE USER = ?', [
          usuario,
          contrasena,
        ])
          .then(() => {
            console.log('RGA: Usuario Modificado ok');
          })
          .catch((e) => {
            console.log('RGA: Usuario no Modificado');
          });
      })
      .catch((e) => {
        console.log('RGA: Base de datos no ok');
      });
  }
}
