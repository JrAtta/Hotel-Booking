import { NgStyle } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-success-page',
  imports: [NgStyle],
  templateUrl: './success-page.html',
  styleUrl: './success-page.scss'
})
export class SuccessPage {
 goToDashboard = output<void>();

  onGoToDashboard(): void {
    this.goToDashboard.emit();
  }
}
