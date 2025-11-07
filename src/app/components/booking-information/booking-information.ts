import { HotelData } from './../../core/services/hotel-data';

// booking-information.component.ts
import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

// Import the child components
import {  BookingForm } from '../booking-form/booking-form';
import {   PaymentForm } from '../payment-form/payment-form';
import { SuccessPage } from '../success-page/success-page';
import { IBookingData } from '../../core/interfaces/IBooking-data';
import { IbookingDetailes } from '../../core/interfaces/ibooking-detailes';
import { IpaymentData } from '../../core/interfaces/ipayment-data';
import { Logo } from "../logo/logo";

@Component({
  selector: 'app-booking-information',
  standalone: true,
  imports: [
    NgStyle,
    NgxSpinnerComponent,
    BookingForm,
    PaymentForm,
    SuccessPage,
    Logo
],
  templateUrl: './booking-information.html',
  styleUrl: './booking-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingInformation {
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);

  // State signals
  currentStep: WritableSignal<'booking' | 'payment' | 'success'> = signal('booking');
  isLoading = signal(false);
  bookingData = signal<IBookingData | null>(null);

  // Computed values
  get isBookingStep(): boolean {
    return this.currentStep() === 'booking';
  }

  get isPaymentStep(): boolean {
    return this.currentStep() === 'payment';
  }

  get isSuccessStep(): boolean {
    return this.currentStep() === 'success';
  }

  get bookingDetails(): IbookingDetailes | null {
    const data = this.bookingData();
    if (!data || !data.days) return null;

    // const costPerDay = data.costPerDay!; // will be dynamic later
    return {
      days: data.days,
      totalCost: data.costPerDay! * data.days,
      costPerDay: data.costPerDay!,
      hotelName: data.hotelName!,
      hotelLocation: data.hotelLocation!,
      hotelCurrency: data.hotelCurrency!,
    };
  }

  // Event handlers
  onBookingSubmit(bookingData: IBookingData): void {
    this.isLoading.set(true);
    this.spinner.show();

    setTimeout(() => {
      this.bookingData.set(bookingData);
      this.currentStep.set('payment');
      this.isLoading.set(false);
      this.spinner.hide();
      console.log('Booking Data:', bookingData);
    }, 3000);
  }

  onPaymentSubmit(paymentData: IpaymentData): void {
    this.isLoading.set(true);
    this.spinner.show();

    setTimeout(() => {
      this.currentStep.set('success');
      this.isLoading.set(false);
      this.spinner.hide();
      console.log('Payment Data:', paymentData);
    }, 5000);
  }

  onCancel(): void {
    this.isLoading.set(true);
    this.spinner.show();

    setTimeout(() => {
      this.isLoading.set(false);
      this.spinner.hide();
      this.router.navigate(['/home']);
    }, 2000);
  }

  onGoToDashboard(): void {
    this.isLoading.set(true);
    this.spinner.show();

    setTimeout(() => {
      this.isLoading.set(false);
      this.spinner.hide();
      this.router.navigate(['/home']);
    }, 3000);
  }

  // Helper method to check step completion for progress indicators
  isStepCompleted(step: number): boolean {
    switch (step) {
      case 1:
        return this.currentStep() === 'booking' || this.currentStep() === 'payment' || this.currentStep() === 'success';
      case 2:
        return this.currentStep() === 'payment' || this.currentStep() === 'success';
      case 3:
        return false; // Step 3 is never "completed" in the traditional sense
      default:
        return false;
    }
  }
}
