import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistrationComponent } from './shared/components/form-registration/form-registration.component';
import { ListComponent } from './shared/components/list/list.component';

const routes: Routes = [
  { path: '', component: FormRegistrationComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
