import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePage } from './home/home.page';

const pages = [
  HomePage
]

@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ...pages
  ]
})
export class PageModule { }
