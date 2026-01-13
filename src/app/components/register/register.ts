import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormData } from '../../core/services/form-data';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  imports: [NgStyle, RouterLink, ReactiveFormsModule, NgxSpinnerComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  // text-wrap : balance  for style

  textWrapBalance = { 'text-wrap': 'balance' };
  // validation logic can be added here

  registerForm!: FormGroup;
  private _FormData = inject(FormData);
  accountCreatedSucssfullyMessage = signal(false);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) // private _FormData: FormData
  {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+[1-9]\d{6,14}$/)],
      ],
      country: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  register() {
    this.spinner.show();
    if (this.registerForm.valid) {
      setTimeout(() => {
        console.log(this.registerForm.value);
        localStorage.setItem('user', JSON.stringify(this.registerForm.value));
        this._FormData.setFormData(this.registerForm.value);
        this.registerForm.reset();
        this.spinner.hide();
        this.accountCreatedSucssfullyMessage.set(true);
      }, 2000);
    } else {
      this.spinner.hide();
      this.registerForm.markAllAsTouched();
      alert('Please correct the errors in the form before submitting.');

    }
  }

  navigateToLogin() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    }, 1500);
  }
}
