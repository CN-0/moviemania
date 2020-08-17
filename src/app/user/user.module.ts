import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([{ path: '', component: UserComponent, canActivate: [AuthGuard] }])
  ]
})
export class UserModule {}
