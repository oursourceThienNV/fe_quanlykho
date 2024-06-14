import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaintenanceComponent} from "../../extrapages/maintenance/maintenance.component";

import {AuthGuard} from "../../core/guards/auth.guard";
import {UsersComponent} from "./users/users.component";
import { ProductListComponent } from './product/product-list.component';
import {ProviderListComponent} from "./provider/provider-list.component";
import {WarehouseListComponent} from "./ware/warehouse-list.component";
import {ExportListComponent} from "./export/export-list.component";


const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'provider', component: ProviderListComponent},
  {path: 'import-house', component: WarehouseListComponent},
  {path: 'export-house', component: ExportListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
