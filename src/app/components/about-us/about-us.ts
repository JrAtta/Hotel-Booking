import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-about-us',
  imports: [NgStyle],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {
  chooseUsCards = signal([
    {
      imgSrc: '/images/crown.png',
      title: 'Luxury Experience',
      desc: 'We now sword-and losury experience.',
    },
    {
      imgSrc: '/images/prime_location.png',
      title: 'prime location',
      desc: 'Ws previde a manierdem location-eanture.',
    },
    {
      imgSrc: '/images/clock.png',
      title: '24/7 Service',
      desc: 'Times wint are kounslisle to msury service.',
    },
    {
      imgSrc: '/images/tag.png',
      title: 'Best Price Guarantee',
      desc: 'We best wars.cos are price nonranmily',
    },
  ]);
}
