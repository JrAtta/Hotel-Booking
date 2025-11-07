import { start } from 'repl';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { HotelCard } from "../hotel-card/hotel-card";
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { IhotelData } from '../../core/interfaces/ihotel-data';
import { HotelData } from '../../core/services/hotel-data';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search-hotels',
  imports: [HotelCard, RouterLink, NgStyle],
  templateUrl: './search-hotels.html',
  styleUrl: './search-hotels.scss'
})
export class SearchHotels implements OnInit,OnDestroy {

  Subscription:Subscription[]=[]
  location:WritableSignal<string> = signal('')
  personsCount:WritableSignal<number> = signal(0)
  startDate:WritableSignal<Date> = signal(new Date())
  endDate:WritableSignal<Date> = signal(new Date())
  data:WritableSignal<IhotelData[]> = signal([]) // all hotels
  hotels:WritableSignal<IhotelData[]> = signal([]) // filtered hotels
  constructor(private route :ActivatedRoute, private hotelsService:HotelData){}
  ngOnInit(): void {
    const sub = this.route.paramMap.subscribe({
      next:(params:ParamMap)=>{
        this.fliterData(params);
        this.filterHotelBySearchForm()
      }

    });
    this.Subscription.push(sub);

  }

    fliterData(params:ParamMap){
          const destination = params.get('destination');
          const personsCount = params.get('personsCount');
          const startDate = params.get('startDate');
          const endDate = params.get('endDate');
          this.location.set(destination!);
          this.personsCount.set(+personsCount!);
          this.startDate.set(new Date(startDate!));
          this.endDate.set(new Date(endDate!));
    }

    filterHotelBySearchForm() {
     const allHotels = this.hotelsService.getData();
     this.data.set(allHotels);
    const hotelChosen = this.data().filter((hotel: IhotelData) => {
      return (
        hotel.location === this.location() ||
        hotel.roomFeature.bedroom === this.personsCount()
      );
    });
    this.hotels.set(hotelChosen);
    // console.log(this.hotels());
  }

  ngOnDestroy(): void {

    this.Subscription.forEach((sub) => sub.unsubscribe());
  }
}
