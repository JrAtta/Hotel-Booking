import { Injectable } from '@angular/core';
import hotelData from "../../../../hotel.json"
import { IhotelData } from '../interfaces/ihotel-data';
@Injectable({
  providedIn: 'root'
})
export class HotelData {

 private data: IhotelData[] = hotelData;
  getData(){
    return this.data;
  }

  getHotelById(id:number){
    return this.data.find( (hotel:IhotelData) => +hotel.id == id)
  }
}
