import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRatingBarComponent } from './ng-rating-bar.component';



@NgModule({
  declarations: [NgRatingBarComponent],
  imports: [
    CommonModule
  ],
  exports: [NgRatingBarComponent]
})
export class NgRatingBarModule { }
