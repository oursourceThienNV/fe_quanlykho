import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {MediaComponent} from "./image/media.component";
import {StoresComponent} from "./stores/stores.component";
const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'media', component: MediaComponent},
  {path:'stores',component:StoresComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
