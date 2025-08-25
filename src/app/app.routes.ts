import { Routes } from '@angular/router';

export const routes: Routes = [

  // Register
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./components/register/register').then((m) => m.Register)
  },

  // Login
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.Login)
  },


];
