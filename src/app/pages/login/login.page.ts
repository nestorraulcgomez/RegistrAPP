
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DBService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  modeloUser: string = '';
  modeloPass: string = '';

  constructor(
    private db: DBService,
    private api: ApiService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  validarLogin() {
    this.api
      .validarLogin(this.modeloUser, this.modeloPass)
      .subscribe((data) => {
        console.log(data);
        if (data.result === 'LOGIN NOK') {
          this.presentToast();

        } else {
          localStorage.setItem('isLogin','TRUE');
          const navigationExtras: NavigationExtras = {
            state: {
              name: this.modeloUser,
            },
          };

          this.router.navigate(['inicio'], navigationExtras);
        }
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Credenciales Inválidas.',
      duration: 2000,
    });
    toast.present();
  }

  mostrarFormulario() {
    this.presentFormulario();
  }
  async presentFormulario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'usuario',
          type: 'text',
          placeholder: 'Nombre de Usuario',
        },
        {
          name: 'contrasena',
          type: 'password',
          placeholder: 'Contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Registrarse',
          handler: (data) => {
            this.api
              .almacenarUsuario(data.usuario, data.contrasena)
              .subscribe((data) => {
                console.log(data);
              });
            this.db.almacenarUsuario(data.usuario, data.contrasena);
          },
        },
      ],
    });

    await alert.present();
  }
}
