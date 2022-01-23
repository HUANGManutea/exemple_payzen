import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(private ngZone: NgZone, private router: Router) {

  }

  navigateToPayment() {
    this.ngZone.run(()=>this.router.navigate(['/payment']));
  }
}
