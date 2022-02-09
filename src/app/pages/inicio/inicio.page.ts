import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  ruta: string = '';
  texto: string = '';
  data: any;

  constructor(private qr: BarcodeScanner, private router: Router) {

    if (this.router.getCurrentNavigation().extras.state.name) {
      this.data = this.router.getCurrentNavigation().extras.state.name;
    }

  }

  ngOnInit() {}

  logout() {
    localStorage.setItem('isLogin', 'FALSE');
    window.location.reload();
  }
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,

      allowEditing: true,

      resultType: CameraResultType.Uri,
    });

    this.ruta = image.webPath;
  }

  leerQR() {
    this.qr.scan().then((info) => {
      this.texto = info['text'];
    });
  }
}
