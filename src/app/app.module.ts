import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

import { NgbAccordionModule, NgbDateParserFormatter, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { SharedModule } from './cyptolanding/shared/shared.module';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { CategoryModule } from "./pages/category/category.module";
import { AuthExpiredInterceptor } from "./core/helpers/auth-expired.interceptor";
import { NgbDateCustomParserFormatter } from "./config/NgbDateCustomParserFormatter";
// import { ConfigIP, ConfigIpService } from "./config-ip.service";
import { SharedModule as SharedModuleV2 } from "./shared/shared.module";
import { CommonModule, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { ApiUrl } from "./shared/constant/ApiUrl.constant";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TokenInterceptor } from './tokenInterceptor';
import { ReactiveFormsModule } from '@angular/forms';

// if (environment.defaultauth === 'firebase') {
//   initFirebaseBackend(environment.firebaseConfig);
// } else {
//   // tslint:disable-next-line: no-unused-expression
//   FakeBackendInterceptor;
// }
registerLocaleData(vi);

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// const appInitializerFn = (appConfig: ConfigIpService) => {
//   return () => {
//     return appConfig.loadConfig();
//   };
// };

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NzDatePickerModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'vi',
      useDefaultLang: true
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CategoryModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    SharedModule,
    ScrollToModule.forRoot(),
    NgbModule,
    SharedModuleV2
  ],
  bootstrap: [AppComponent],
  providers: [
    ApiUrl,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthExpiredInterceptor, multi: true },
    // {provide: NgbDateAdapter, useClass: NgbDateMomentAdapter},
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    // {
    //   provide: ConfigIP,
    //   useExisting: ConfigIpService,
    //   deps: [HttpClientModule]
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializerFn,
    //   multi: true,
    //   deps: [ConfigIpService, ApiUrl]
    // },
  ],
})
export class AppModule {
}
