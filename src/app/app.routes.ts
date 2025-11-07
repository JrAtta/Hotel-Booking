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
    path: 'booking-page/:id',
    title: 'Booking Page',
    loadComponent: () =>
      import('./components/booking-information/booking-information').then((m) => m.BookingInformation)
  },
  //hotelDeatailes
  {
    path: 'hotel-details/:id',
    title: 'Hotel Details',
    loadComponent: () =>
      import('./components/hotel-detailes/hotel-detailes').then((m) => m.HotelDetailes)
  },
  //search
  {
    path:'search/hotels/:destination/:personsCount/:startDate/:endDate',
    title: 'Search Hotels',
    loadComponent: () =>
      import('./components/search-hotels/search-hotels').then((m) => m.SearchHotels)
  },
  //activity details
  {
    path: 'activity-details/:id',
    title: 'Activity Details',
    loadComponent: () =>
      import('./components/activity-details/activity-details').then((m) => m.ActivityDetails)
  },


  // not found
  

];




