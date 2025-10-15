import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelData } from '../../core/services/hotel-data';
import { IhotelData } from '../../core/interfaces/ihotel-data';

@Component({
  selector: 'app-hotel-detailes',
  imports: [],
  templateUrl: './hotel-detailes.html',
  styleUrl: './hotel-detailes.scss',
})
export class HotelDetailes implements OnInit, OnDestroy {
  id = signal(0);
  subscription : Subscription[] = [];
  hotelDetails:WritableSignal<any> = signal(null);
  constructor(private _route: ActivatedRoute, private hotelService:HotelData) {}
  ngOnInit(): void {
   const sub =  this._route.paramMap.subscribe({
      next: (para: ParamMap) => {
        this.id.set(+para.get('id')!);
       const hotel = this.hotelService.getHotelById(+this.id());
        this.hotelDetails.set(hotel);
        console.log(this.hotelDetails());
      },
      error: (err: HttpErrorResponse | Error) => {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
    this.subscription.push(sub);

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub?) => sub?.unsubscribe());
  }
}
