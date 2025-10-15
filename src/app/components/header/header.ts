import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from "../logo/logo";

@Component({
  selector: 'app-header',
  imports: [NgStyle, RouterLink,RouterLinkActive, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
