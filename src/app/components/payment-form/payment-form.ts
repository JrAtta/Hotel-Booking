

// payment-form.component.ts
import { CurrencyPipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  OnInit
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { IbookingDetailes } from '../../core/interfaces/ibooking-detailes';
import { IpaymentData } from '../../core/interfaces/ipayment-data';





@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentForm implements OnInit {
  private _fb = inject(FormBuilder);

  // Inputs
  bookingDetails = input.required<IbookingDetailes>();
  isLoading = input<boolean>(false);

  // Outputs
  paymentSubmit = output<IpaymentData>();
  cancelPayment = output<void>();

  paymentForm!: FormGroup;

  ngOnInit(): void {
    this.initializePaymentForm();
  }

  private initializePaymentForm(): void {
    this.paymentForm = this._fb.group({
      cardNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(\d{4}\s){3}\d{4}$/),
        ]
      ],
      bankName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      cvv: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d{3,4}$/)
        ]
      ],
      expirationDate: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
          this.expirationDateValidator()
        ]
      ]
    });
  }

  private luhnValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.replace(/\s/g, '');
      if (!value) return null;

      let sum = 0;
      let isEven = false;
      for (let i = value.length - 1; i >= 0; i--) {
        let digit = parseInt(value.charAt(i), 10);
        if (isEven) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
      }
      return sum % 10 === 0 ? null : { invalidCard: true };
    };
  }

  private expirationDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const [month, year] = value.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      const inputYear = parseInt(year, 10);
      const inputMonth = parseInt(month, 10);

      if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        return { expired: true };
      }
      return null;
    };
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); //
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;

    this.paymentForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
  }
  formatBankName(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    if (value.length > 50) value = value.slice(0, 50);
    this.paymentForm.get('bankName')?.setValue(value, { emitEvent: false }); // Update the form control without emitting another event
  }

  formatExpirationDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    this.paymentForm.get('expirationDate')?.setValue(value, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentData: IpaymentData = this.paymentForm.value;
      this.paymentSubmit.emit(paymentData);
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelPayment.emit();
  }
}
