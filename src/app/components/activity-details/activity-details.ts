import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivitiesToChoose } from '../../core/services/activities-to-choose';
import { Iactivities } from '../../core/interfaces/iactivities';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { NearbyActivities } from '../nearby-activities/nearby-activities';
register();

@Component({
  selector: 'app-activity-details',
  imports: [NgStyle, NearbyActivities, DatePipe, ],
  templateUrl: './activity-details.html',
  styleUrl: './activity-details.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ActivityDetails implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private activities = inject(ActivitiesToChoose);
  private _route = inject(Router)
  activityId = signal<number>(0);
  activity = signal<Iactivities>({} as Iactivities);
  Subscription = signal<Subscription[]>([]);
  date: Date = new Date();
  ngOnInit(): void {
    const sub = this._activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.activityId.set(+params.get('id')!);
        const activity = this.activities.getactivityById(this.activityId());
        this.activity.set(activity!);
        console.log(this.activity());
      },
      error(err: HttpErrorResponse | Error) {
        console.error('Error fetching activity details:', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
    this.Subscription().push(sub);
  }


    generateActNo() {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const name = this.activity().name.slice(0, 3).toUpperCase();
      return `ACT${randomNum + name + this.date.getDate()}`;
    }
    returnHome(){
     return this._route.navigate(['/home'])
    }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.Subscription().forEach((sub) => sub.unsubscribe());
  }
}
