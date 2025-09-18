import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormData } from '../../core/services/form-data';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgStyle, RouterLink, AsyncPipe, NgClass,],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login implements OnInit {

   textWrapBalance = { 'text-wrap': 'balance' }
    isMobile$!:Observable<boolean>
  isPasswordVisible:boolean = false

  loginForm!: FormGroup;
  formData: any;

  constructor( private _FormData: FormData, private fb: FormBuilder, private _breakpointObserver: BreakpointObserver, private router: Router) {}

  user: any;


  ngOnInit() {

    this.isMobile$ = this._breakpointObserver.observe('(max-width: 767px)')
  .pipe(map(result => result.matches));

    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user')!);
    }

      this.formData = this._FormData.data();
      console.log(this.formData);
      console.log(this.user);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },
  this.invalidUser);
  }

  login() {
     if (this.loginForm.valid && this.user.email === this.loginForm.value.email && this.user.password === this.loginForm.value.password) {

      console.log(this.loginForm.value);
      this._FormData.setFormData(this.loginForm.value);
      this.loginForm.reset();
      this.navigateToBookingPage();
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.setErrors({'invalidUser': true});

      console.log(this.loginForm);

    }
  }







invalidUser(form:AbstractControl) : { [key: string]: any } | null {

  if(form.get('email')?.value === this.user.email && form.get('password')?.value === this.user.password) {
    return null;
  } else {
    return {'invalidUser': true};
  }

}











  // Toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  navigateToBookingPage() {
    this.router.navigate(['/booking page']);
  }
}
