import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormData } from '../../core/services/form-data';

@Component({
  selector: 'app-register',
  imports: [NgStyle, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    // private _FormData: FormData
  ) {}

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
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      localStorage.setItem('user', JSON.stringify(this.registerForm.value));
      this._FormData.setFormData(this.registerForm.value);
      this.registerForm.reset();
      this.accountCreatedSucssfullyMessage.set(true);
      // this.navigateToLogin();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
