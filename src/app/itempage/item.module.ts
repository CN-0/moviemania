import { NgModule } from '@angular/core';
import { ItempageComponent } from './itempage.component';
import { SharedModule } from '../shared/shared.Module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ItempageComponent],
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([{ path: '', component: ItempageComponent }])
  ]
})

export class ItemModule {}
