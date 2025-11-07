import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgStyle, JsonPipe, DatePipe, NgClass } from '@angular/common';
import { HotelData } from '../../core/services/hotel-data';
import { IhotelData } from '../../core/interfaces/ihotel-data';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MostPicked } from '../most-picked/most-picked';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    // JsonPipe,
    // DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatSelectModule,
    NgClass,
    MostPicked,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  data: WritableSignal<IhotelData[]> = signal([]);
  bannerFeatures = [
    {
      icon: 'images/ic_traveler.png',
      number: '2500',
      title: 'users',
    },
    {
      icon: 'images/ic_treasure.png',
      number: '200',
      title: 'treasure',
    },
    {
      icon: 'images/ic_cities.png',
      number: '100',
      title: 'cities',
    },
  ];
  // mapping hotel destinations here >>
  destinations: WritableSignal<string[]> = signal([]);

  constructor(private hotelData: HotelData, private FB: FormBuilder) {
    effect(() => {
      this.serachGroup
        .get('destination')
        ?.setValue(this.location(), { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.data.set(this.hotelData.getData());
    const locations = this.data().map((hotel) => hotel.location);
    this.destinations.set(locations);
    this.initializeForm();
  }

  serachGroup!: FormGroup;
  //controls

  personsCount: WritableSignal<1 | 2 | 3> = signal(1);
  location: WritableSignal<string> = signal('');

  initializeForm() {
    this.serachGroup = this.FB.group({
      destination: [this.location(), []],
      startDate: ['', []],
      endDate: ['', []],
      personsCount: [this.personsCount(), []], // has not formcontrolName in template because is no input or select elements just button
    });
  }
  selectedPersonsCount(person: 1 | 2 | 3) {
    this.personsCount.set(person);
    this.serachGroup.get('personsCount')?.setValue(person); // لازم دي عشان اضمن انها اتخزنت ف الفورم
  }

  onSubmit() {
    console.log(this.serachGroup);

    const selectedDate = this.serachGroup.get('startDate')?.value;
    const today = new Date();
    const checkdate = new Date(selectedDate);
    console.log(selectedDate);
    console.log(checkdate);
    console.log(today);
    today.setHours(0, 0, 0, 0);
    checkdate.setHours(0, 0, 0, 0);
    //check what is bigger date or today

    if (selectedDate > today) {
      console.log('valid');
    } else if (selectedDate < today) {
      console.log('invalid');
    } else {
      console.log('equal');
    }
    console.log('invalid');
  }


}
