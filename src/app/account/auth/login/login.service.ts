import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {AccountService} from "../account.service";
import {Login} from "./login.model";
import {AuthServerProvider} from "./auth-jwt.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../shared/constant/ApiUrl.constant";

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private accountService: AccountService,
              private authServerProvider: AuthServerProvider,
              private http: HttpClient, private api: ApiUrl,
              private router: Router) {
  }

  login(credentials: Login):
    Observable<any | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  resetPassword(email: string) {
    return this.http.post(this.api.getCatalogApi() + '/account/reset-password/init', email);
  }

  logout() {
    this.authServerProvider.logout().subscribe({complete: () => this.accountService.authenticate(null)});
    this.router.navigate(['/account/login']);
  }
}
