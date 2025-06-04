import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NgbAccordionModule,
  NgbCollapseModule, NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbTooltipModule,
  NgbTypeaheadModule
} from "@ng-bootstrap/ng-bootstrap";
import {NgApexchartsModule} from "ng-apexcharts";
import {HttpClientModule} from "@angular/common/http";
import {UIModule} from "../../shared/ui/ui.module";
import {WidgetModule} from "../../shared/widget/widget.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {SimplebarAngularModule} from "simplebar-angular";
import {LightboxModule} from "ngx-lightbox";
import {NgSelectModule} from "@ng-select/ng-select";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { UsersComponent } from './users/users.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { UsersDialogComponent } from './users/users-dialog/users-dialog.component';
import {MediaComponent} from "./image/media.component";
import {MediaDialogComponent} from "./image/media-dialog.component";
import {StoresComponent} from "./stores/stores.component";

@NgModule({
  declarations: [
    UsersComponent, ResetPasswordComponent,UsersDialogComponent,MediaComponent,MediaDialogComponent,StoresComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    NgbAccordionModule,
    NgSelectModule,
    NgbDatepickerModule,
    BsDatepickerModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    TranslateModule,
    NgbTooltipModule,
    TooltipModule,
    CKEditorModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class CategoryModule {
}
