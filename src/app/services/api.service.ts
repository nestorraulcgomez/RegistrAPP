import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../interfaces/respuesta-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase = 'https://fer-sepulveda.cl/api/api-prueba2.php';

  constructor(private http: HttpClient) { }

  validarLogin(usuario, contrasena) {
    return this.http.get<Respuesta>(
      this.rutaBase + '?nombreFuncion=UsuarioLogin&usuario='
      + usuario + '&contrasena=' + contrasena);
  }

  almacenarUsuario(usuario,contrasena) {
    return this.http.post(this.rutaBase, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [usuario, contrasena] });
  }

  modificarUsuario(usuario,contrasena){
  return this.http.put(this.rutaBase, {
    nombreFuncion: "UsuarioModificarContrasena",
    parametros: { usuario: usuario, contrasena: contrasena} });
  }
}
