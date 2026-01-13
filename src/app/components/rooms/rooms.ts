import { NgStyle, NgClass, CurrencyPipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { IroomData } from '../../core/interfaces/iroom-data';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-rooms',
  imports: [NgStyle, CurrencyPipe, RouterLink],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  roomData: WritableSignal<IroomData[]> = signal([
    {
      roomType: 'Deluxe Room',
      description: 'A comfortable room with modern furnishings and city views.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bathroom.png',
        '/images/ic_bedroom.png',
        '/images/ic_tv.png',
      ],
      price: 500,
      image: '/images/Rooms/Room1.jpg',
    },
    {
      roomType: 'Superior Room',
      description:
        'Spacious and elegant, perfect for business or leisure stays.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bedroom.png',
        '/images/ic_tv.png',
        '/images/ic_ac.png',
      ],
      price: 650,
      image: '/images/Rooms/Room2.jpg',
    },
    {
      roomType: 'Executive Room',
      description:
        'Designed for executives with a work desk and premium comfort.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bathroom.png',
        '/images/ic_tv.png',
      ],
      price: 800,
      image: '/images/Rooms/Room3.jpg',
    },
    {
      roomType: 'Junior Suite',
      description: 'A stylish suite offering extra space and relaxation.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bedroom.png',
        '/images/ic_bathroom.png',
      ],
      price: 950,
      image: '/images/Rooms/Room4.jpg',
    },
    {
      roomType: 'Family Room',
      description: 'Ideal for families with generous space and multiple beds.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bedroom.png',
        '/images/ic_bathroom.png',
      ],
      price: 1100,
      image: '/images/Rooms/Room5.jpg',
    },
    {
      roomType: 'Luxury Suite',
      description:
        'Experience luxury with refined interiors and premium services.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bathroom.png',
        '/images/ic_tv.png',
      ],
      price: 1400,
      image: '/images/Rooms/Room6.jpg',
    },
    {
      roomType: 'Presidential Suite',
      description: 'Top-tier suite with panoramic views and exclusive comfort.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bathroom.png',
        '/images/ic_tv.png',
      ],
      price: 2000,
      image: '/images/Rooms/Room7.jpg',
    },
    {
      roomType: 'Economy Room',
      description: 'Simple, clean, and affordable with essential amenities.',
      amenities: [
        '/images/ic_wifi.png',
        '/images/ic_bedroom.png',
        '/images/ic_tv.png',
      ],
      price: 350,
      image: '/images/Rooms/Room8.jpg',
    },
  ]);
}
