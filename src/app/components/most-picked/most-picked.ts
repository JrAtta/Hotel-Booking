import { IhotelData } from './../../core/interfaces/ihotel-data';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';
import { RouterLink } from '@angular/router';
import { HotelCard } from "../hotel-card/hotel-card";

@Component({
  selector: 'app-most-picked',
  imports: [NgStyle, RouterLink, HotelCard],
  templateUrl: './most-picked.html',
  styleUrl: './most-picked.scss'
})
export class MostPicked implements OnInit {

  mostPicked:WritableSignal<IhotelData[]> = signal([])
  hotels:WritableSignal<IhotelData[]> = signal([])
  constructor(private hotelData:HotelData){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const mostPickedHotels = this.hotelData.getData().slice(0,5)
    this.mostPicked.set(mostPickedHotels);

    const allHotels = this.hotelData.getData().slice(20,28);
    this.hotels.set(allHotels);
    // console.log(this.hotelData.getHotelById(1));


  }


  hotelDetailes(hotel:any){
    console.log(hotel);
  }
}
