import {  CurrencyPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-information',
  imports: [
    NgStyle,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    CurrencyPipe
],
  templateUrl: './booking-information.html',
  styleUrl: './booking-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingInformation implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder);
  private router = inject(Router);
  bookingInfoForm!: FormGroup;
  // Signals for reactive state
  days: WritableSignal<number | null> = signal(null);
  startDate: WritableSignal<Date | null> = signal(null);
  endDate: WritableSignal<Date | null> = signal(null);
  subscription: Subscription[] = [];

// those for checks must be false
  isFormBooked: boolean = true;
  isPaymentCompleted: boolean = false;

  constructor() {
    // Sync signal changes to form controls
    effect(() => {
      if (this.bookingInfoForm) {
        // Sync days
        this.bookingInfoForm
          .get('days')
          ?.setValue(this.days(), { emitEvent: false });

        // Sync start date
        this.bookingInfoForm
          .get('startDate')
          ?.setValue(this.startDate(), { emitEvent: false });

        // Sync end date
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
    console.log(this.bookingInfoForm.value);
  }

  private initializeForm(): void {
    this.bookingInfoForm = this._fb.group({
      days: [
        this.days(), // Initialize with signal value
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
    // Sync days form control changes to signal
    const daysSub = this.bookingInfoForm
      .get('days')
      ?.valueChanges.subscribe((value) => {
        if (value && value !== this.days()) {
          this.days.set(value);
        }
      });

    // Sync start date form control changes to signal
    const startDateSub = this.bookingInfoForm
      .get('startDate')
      ?.valueChanges.subscribe((value) => {
        if (value !== this.startDate()) {
          this.startDate.set(value);
        }
      });

    // Sync end date form control changes to signal
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

  // Days manipulation methods
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

  // Validate old date - implemented as a validator function
  validateOldDate(control: any): ValidationErrors | null {
    const today = new Date();
    const selectedDate = control.value;

    if (!selectedDate) return null;

    // Set time to 00:00:00 for accurate date comparison
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(selectedDate);
    dateToCheck.setHours(0, 0, 0, 0);

    if (dateToCheck < today) {
      return { invalidDate: true };
    }

    return null;
  }

  // Fixed clear dates method - clears both dates
  clearDates(): void {
    this.bookingInfoForm.get('days')?.setValue(null) || this.days.set(null);
    this.bookingInfoForm.get('startDate')?.reset();
    this.bookingInfoForm.get('endDate')?.reset();
  }

  submitBookingInfo(): void {
    if (this.bookingInfoForm.valid) {
      const bookingData = {
        days: this.days(),
        startDate: this.startDate(),
        endDate: this.endDate(),
      };
      console.log('Complete Booking Data:', bookingData);
      this.isFormBooked = true;
    } else {
      console.log('Form is invalid');
      console.log('Form Value:', this.bookingInfoForm.value);
      console.log('Form Errors:', this.getFormErrors());
      this.bookingInfoForm.markAllAsTouched();
    }
  }

  private getFormErrors(): any {
    let formErrors: any = {};

    Object.keys(this.bookingInfoForm.controls).forEach(key => {
      const controlErrors = this.bookingInfoForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });

    return formErrors;
  }

  //cancel booking
  cancelBooking() {
    this.router.navigate(['/home']);
  }

  get daysControl(){
    return this.bookingInfoForm.get('days');
  }
  get startDateControl() {
    return this.bookingInfoForm.get('startDate');
  }
  get endDateControl() {
    return this.bookingInfoForm.get('endDate');
  }

  totalCost(costPerDay:number): any {
    return costPerDay * this.days()!;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach((sub) => sub.unsubscribe());
    }
  }


  // payement component
}
