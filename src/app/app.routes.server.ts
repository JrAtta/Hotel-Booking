import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'booking-page/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'search/hotels/:destination/:personsCount/:startDate/:endDate',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
