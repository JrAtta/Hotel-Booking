import { Component, inject, OnDestroy, OnInit,  signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Header } from "./components/header/header";
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('hotelBooking');
  isPath = signal(false);
  private router = inject(Router);
  private sub: Subscription | null = null;

  ngOnInit(): void {
    const current = this.router.url;
    this.updateIsPath(current);

    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateIsPath(event.urlAfterRedirects);
      });
  }

  private updateIsPath(url: string) {
    const hideRoutes = ['/register', '/login', '/booking-page'];
    const shouldHide = hideRoutes.some(r => url.includes(r));
    this.isPath.set(shouldHide);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
