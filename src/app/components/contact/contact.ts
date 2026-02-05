import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  imports: [NgStyle, ReactiveFormsModule, NgxSpinnerComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  contactForm!: FormGroup;

  constructor(private _fb: FormBuilder, private spinner: NgxSpinnerService, private router: Router) {}
  ngOnInit() {
    this.contactForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', []],
      message: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.spinner.show();
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      setTimeout(() => {
        this.spinner.hide();
        this.contactForm.reset();
        this.goToHome();
      }, 3000);
    } else {
      setTimeout(() => {
        this.spinner.hide();
        this.contactForm.markAllAsTouched();
      }, 1000);
    }
  }

  goToHome() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
