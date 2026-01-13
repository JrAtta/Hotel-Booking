import { Subscription } from 'rxjs';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelData } from '../../core/services/hotel-data';
import { NgStyle } from '@angular/common';
import { IRoomFeature } from '../../core/interfaces/ihotel-data';
import { NearbyActivities } from "../nearby-activities/nearby-activities";
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
// import Swiper from 'swiper';

@Component({
  selector: 'app-hotel-detailes',
  imports: [NgStyle, RouterLink, NearbyActivities, NgxSpinnerComponent],
  templateUrl: './hotel-detailes.html',
  styleUrl: './hotel-detailes.scss',

})
export class HotelDetailes implements OnInit, OnDestroy {
  id = signal(0);
  subscription: Subscription[] = [];
  hotelDetails: WritableSignal<any> = signal({});
  roomFeatures: WritableSignal<any> = signal({});

  features = signal([
    {
      icon: 'images/ic_bedroom.png',
      title: 'bedroom',
      value: 0,
    },
    {
      icon: 'images/ic_livingroom.png',
      title: 'living room',
      value: 0,
    },
    {
      icon: 'images/ic_bathroom.png',
      title: 'bathroom',
      value: 0,
    },
    {
      icon: 'images/ic_diningroom.png',
      title: 'dining room',
      value: 0,
    },
    {
      icon: 'images/ic_wifi.png',
      title: 'mbp/s',
      value: 0,
    },
    {
      icon: 'images/ic_ac.png',
      title: 'unit ready',
      value: 0,
    },
    {
      icon: 'images/ic_kulkas.png',
      title: 'refigrator',
      value: 0,
    },
    {
      icon: 'images/ic_tv.png',
      title: 'television',
      value: 0,
    },
  ]);



  constructor(
    private _route: ActivatedRoute,
    private hotelService: HotelData,
    private spinner:NgxSpinnerService
    ,private router:Router
  ) {}
  ngOnInit(): void {
    const sub = this._route.paramMap.subscribe({
      next: (para: ParamMap) => {
        this.id.set(+para.get('id')!);
        const hotel = this.hotelService.getHotelById(+this.id());
        this.hotelDetails.set(hotel);
        this.roomFeatures.set(hotel?.roomFeature);
        this.mergeRoomFeatures();
      },
      error: (err: HttpErrorResponse | Error) => {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
    this.subscription.push(sub);
    console.log(this.hotelDetails());
  }

  mergeRoomFeatures() {
    const keyMapping: { [key: string]: keyof IRoomFeature } = {
      bedroom: 'bedroom',
      'living room': 'livingRoom',
      bathroom: 'bathroom',
      'dining room': 'diningroom',
      'mbp/s': 'internetDownload',
      'unit ready': 'unitReady',
      refigrator: 'refrigerator',
      television: 'television',
    };
    const updateFeatures = this.features().map((feature) => {
      const key = keyMapping[feature.title];
      const value = this.roomFeatures()[key];
      return {
        ...feature,
        value: value,
      };
    });
    this.features.set(updateFeatures);
  }

  bookNow(){

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/booking-page', this.hotelDetails().id]);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub?) => sub?.unsubscribe());
  }
}
