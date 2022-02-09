import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router ){

  }
  isLoggin() {
    return localStorage.getItem('isLogin') === 'TRUE';
  }
  canActivate(route: ActivatedRouteSnapshot) {
    const { urlName } = route.data;
    // return true;
    if (!this.isLoggin() && urlName !== '/login') {
      this.router.navigate(['login']);
      return false;
    }

    if (urlName === '/login' && this.isLoggin()) {
      this.router.navigate(['inicio']);
      return true;
    }

    return true;
  }
}
