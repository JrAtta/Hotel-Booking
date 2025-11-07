import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, WritableSignal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ActivitiesToChoose } from '../../core/services/activities-to-choose';
import { Iactivities } from '../../core/interfaces/iactivities';
import { NgClass,  NgStyle, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
register();
@Component({
  selector: 'app-nearby-activities',
  imports: [ SlicePipe, NgStyle, NgClass,RouterLink],
  templateUrl: './nearby-activities.html',
  styleUrl: './nearby-activities.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NearbyActivities implements OnInit {




activities = signal<Iactivities[]>([]);

  // swiper
  spaceBetween = 10;
  breakPoints = {
    '0': {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    '768': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '992': {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    '1200': {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  };

  constructor(private _activities:ActivitiesToChoose) { }
  ngOnInit(): void {
    const activities = this._activities.getActivities();
    this.activities.set(activities);
  }




}
