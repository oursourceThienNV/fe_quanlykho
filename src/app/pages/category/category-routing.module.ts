import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {RegisterTripComponent} from "./register-trip/register-trip.component";
import {RegisterFormComponent} from "./register-trip/register-form.component";
const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path:'register-trip',component:RegisterTripComponent},
  {path:'register-form',component:RegisterFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
