import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  modeloUser: string = '';
  modeloPass1: string = '';
  modeloPass2: string = '';



  constructor(private api: ApiService,
     private db: DBService,
     private toastController: ToastController,
     private router: Router
     ) {}

  ngOnInit() {}

  modificarUsuario() {
    this.db.modificarUsuario(this.modeloUser, this.modeloPass2).then((data) => {
      console.log('RGA: Usuario modificado');
    });

    //captura los valores de la contraseña nueva mas el nombre de usuario y lo modifica
    this.api.modificarUsuario(this.modeloUser, this.modeloPass2).subscribe(data => {
        console.log(data);
        if(data){
          this.router.navigate(['login']);
        }else{
          this.presentToast();
        }

    });

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario Invalido',
      duration: 2000,
    });
    toast.present();
  }
}
