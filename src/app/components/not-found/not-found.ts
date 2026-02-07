import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [NgStyle, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {

}
