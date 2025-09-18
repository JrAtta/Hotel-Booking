import { Routes } from '@angular/router';

export const routes: Routes = [

  //home
  {
    path: '',
    title: 'Home',
    loadComponent: () =>
      import('./components/home/home').then((m) => m.Home)
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () =>
      import('./components/home/home').then((m) => m.Home)
  },
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
  // booking information
  {
    path: 'booking page',
    title: 'Booking Page',
    loadComponent: () =>
      import('./components/booking-information/booking-information').then((m) => m.BookingInformation)
  },


];
