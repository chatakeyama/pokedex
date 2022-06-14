import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistrationComponent } from './shared/components/form-registration/form-registration.component';
import { ListComponent } from './shared/components/list/list.component';
import { PokedexComponent } from './shared/components/pokedex/pokedex.component';

const routes: Routes = [
  { path: 'add', component: FormRegistrationComponent },
  { path: 'list', component: ListComponent },
  { path: 'pokedex/:id', component: PokedexComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
