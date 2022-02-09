import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/auth.service';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'modificar',
    redirectTo: 'modificar',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[AuthenticationService],


  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate:[AuthenticationService],
    data: {urlName: '/login'}
  },
  {
    path: 'modificar',
    loadChildren: () => import('./pages/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
