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

  // hotels
  {
    path:'hotels',
    title: 'Hotels',
    loadComponent: () =>
      import('./components/hotels/hotels').then((m) => m.Hotels)
  },

  //Rooms
  {
    path:'rooms',
    title: 'Rooms',
    loadComponent: () =>
      import('./components/rooms/rooms').then((m) => m.Rooms)
  },
  {
    path:'about',
    title: 'About Us',
    loadComponent: () =>
      import('./components/about-us/about-us').then((m) => m.AboutUs)
  },

  //





  //not found   >>>>>>>> must be last <<<<<<<<
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound)
  },




];




