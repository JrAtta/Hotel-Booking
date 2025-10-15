import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgStyle, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
