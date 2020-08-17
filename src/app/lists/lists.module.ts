import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.Module';
import { ListsComponent } from './lists.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ListsComponent }])
  ]
})

export class ListsModule {}

