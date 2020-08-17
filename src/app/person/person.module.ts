import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { SharedModule } from '../shared/shared.Module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PersonComponent],
  imports: [SharedModule,
    RouterModule.forChild([{ path: '', component: PersonComponent }])]
})

export class PersonModule {}
