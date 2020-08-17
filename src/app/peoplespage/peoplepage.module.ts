import { NgModule } from '@angular/core';
import { PeoplespageComponent } from './peoplespage.component';
import { SharedModule } from '../shared/shared.Module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PeoplespageComponent],
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([{ path: '', component: PeoplespageComponent }])
  ]
})

export class PeoplepageModule {}
