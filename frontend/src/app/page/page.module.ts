import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from '../components/components.module';
import { HomePage } from './home/home.page';

const pages = [
  HomePage
]

@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ComponentsModule
  ],
  exports: [
    ...pages
  ]
})
export class PageModule { }
