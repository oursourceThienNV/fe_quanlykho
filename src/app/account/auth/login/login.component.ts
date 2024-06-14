import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from "./login.service";
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private loginService: LoginService,private accountService: AccountService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginService.login({
        username: this.f.username.value, password: this.f.password.value
      })
        .subscribe(
          data => {
            // this.router.navigate(['/pages/home']);
            if(localStorage.getItem("authDate")===""){
              this.error="Đăng nhập thất bại";
            }
            this.accountService.identity().subscribe(res=>{
              console.log("=>>>",res.body.userInfo);
              localStorage.setItem("role",res.body.userInfo.role);
            })
            this.router.navigate(['/pages']);
          },
          error => {
            this.error = error ? error : '';
          });
    }
  }
}
