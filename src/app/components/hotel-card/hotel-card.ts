import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { HotelData } from '../../core/services/hotel-data';
import { IhotelData } from '../../core/interfaces/ihotel-data';

@Component({
  selector: 'app-hotel-card',
  imports: [],
  templateUrl: './hotel-card.html',
  styleUrl: './hotel-card.scss'
})
export class HotelCard implements OnInit {

  hotels:WritableSignal<IhotelData[]> = signal([]);
  hotel =  input.required<IhotelData>();
  constructor(private hotelData:HotelData){}

  ngOnInit(): void {
   const data =  this.hotelData.getData();
   this.hotels.set(data);
  }
}
