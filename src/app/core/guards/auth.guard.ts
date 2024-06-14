import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { environment } from '../../../environments/environment';
import {AccountService} from "../../account/auth/account.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,

    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (environment.defaultauth === 'firebase') {
        //     // const currentUser = this.authenticationService.currentUser();
        //     if (currentUser) {
        //         // logged in so return true
        //         return true;
        //     }
        // }

        const token = localStorage.getItem('jwt');
        // if(token === undefined || token === null || token === '') {
        //   this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        //   return false;
        // }
        return true;
    }
}
