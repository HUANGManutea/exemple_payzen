import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopPage implements OnInit {

  constructor(private ngZone: NgZone, private router: Router) {
  }

  ngOnInit(): void {
  }

  checkout() {
    this.ngZone.run(()=>this.router.navigate(['/checkout']));
  }

}
