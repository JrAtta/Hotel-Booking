import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HotelCard } from "../hotel-card/hotel-card";
import { IhotelData } from '../../core/interfaces/ihotel-data';
import { HotelData } from '../../core/services/hotel-data';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-hotels',
  imports: [HotelCard, RouterLink,NgStyle],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss'
})
export class Hotels implements OnInit {
  hotels:WritableSignal<IhotelData[]> = signal([]);
 constructor(private hotelData:HotelData){}

  ngOnInit(): void {
   const data =  this.hotelData.getData();
   this.hotels.set(data);
   console.log(this.hotels());
  }
}
