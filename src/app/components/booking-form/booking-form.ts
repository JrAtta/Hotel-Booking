
import { CurrencyPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  WritableSignal,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { IBookingData } from '../../core/interfaces/IBooking-data';



@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    CurrencyPipe,
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingForm implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder);

  // Inputs
  isLoading = input<boolean>(false);

  // Outputs
  formSubmit = output<IBookingData>();
  cancelBooking = output<void>();

  bookingInfoForm!: FormGroup;
  private subscription: Subscription[] = [];

  // Signals for reactive state
  days: WritableSignal<number | null> = signal(null);
  startDate: WritableSignal<Date | null> = signal(null);
  endDate: WritableSignal<Date | null> = signal(null);

  constructor() {
    // Sync signal changes to form controls
    effect(() => {
      if (this.bookingInfoForm) {
        this.bookingInfoForm
          .get('days')
          ?.setValue(this.days(), { emitEvent: false });

        this.bookingInfoForm
          .get('startDate')
          ?.setValue(this.startDate(), { emitEvent: false });

        this.bookingInfoForm
          .get('endDate')
          ?.setValue(this.endDate(), { emitEvent: false });
      }
    });

    // Auto-calculate days when dates change
    effect(() => {
      const start = this.startDate();
      const end = this.endDate();

      if (start && end && end > start) {
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff !== this.days()) {
          this.days.set(daysDiff);
        }
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormSubscriptions();
  }

  private initializeForm(): void {
    this.bookingInfoForm = this._fb.group({
      days: [
        this.days(),
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[1-9]\d*$/),
        ],
      ],
      startDate: [this.startDate(), [Validators.required, this.validateOldDate.bind(this)]],
      endDate: [this.endDate(), [Validators.required]]
    });
  }

  private setupFormSubscriptions(): void {
    const daysSub = this.bookingInfoForm
      .get('days')
      ?.valueChanges.subscribe((value) => {
        if (value && value !== this.days()) {
          this.days.set(value);
        }
      });

    const startDateSub = this.bookingInfoForm
      .get('startDate')
      ?.valueChanges.subscribe((value) => {
        if (value !== this.startDate()) {
          this.startDate.set(value);
        }
      });

    const endDateSub = this.bookingInfoForm
      .get('endDate')
      ?.valueChanges.subscribe((value) => {
        if (value !== this.endDate()) {
          this.endDate.set(value);
        }
      });

    if (daysSub) this.subscription.push(daysSub);
    if (startDateSub) this.subscription.push(startDateSub);
    if (endDateSub) this.subscription.push(endDateSub);
  }

  decrease(): void {
    if (this.days()! > 1) {
      this.days.update((prev) => (prev)! - 1);
    }
  }

  increase(): void {
    if (this.days()! < 30) {
      this.days.update((prev) => (prev)! + 1);
    }
  }

  validateOldDate(control: any): ValidationErrors | null {
    const today = new Date();
    const selectedDate = control.value;

    if (!selectedDate) return null;

    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(selectedDate);
    dateToCheck.setHours(0, 0, 0, 0);

    if (dateToCheck < today) {
      return { invalidDate: true };
    }

    return null;
  }

  clearDates(): void {
    this.bookingInfoForm.get('days')?.setValue(null) || this.days.set(null);
    this.bookingInfoForm.get('startDate')?.reset();
    this.bookingInfoForm.get('endDate')?.reset();
  }

  onSubmit(): void {
    if (this.bookingInfoForm.valid) {
      const bookingData: IBookingData = {
        days: this.days(),
        startDate: this.startDate(),
        endDate: this.endDate(),
      };
      this.formSubmit.emit(bookingData);
    } else {
      this.bookingInfoForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelBooking.emit();
  }

  totalCost(costPerDay: number): number {
    return costPerDay * (this.days() || 0);
  }

  get daysControl() {
    return this.bookingInfoForm.get('days');
  }

  get startDateControl() {
    return this.bookingInfoForm.get('startDate');
  }

  get endDateControl() {
    return this.bookingInfoForm.get('endDate');
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
