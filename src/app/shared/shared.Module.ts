import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [ CardComponent, LoadingComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, CardComponent, LoadingComponent]
})

export class SharedModule{}
