import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import {buildUnitTree} from "../../../../core/utils/common";
import {UserProfileService} from "../../../../core/services/user.service";
interface Pharse{
  stt:number;
  id:number,
  code:string,
  name:string,
  unit:string,
  amount:string,
  dueDate:Date,
  fullName:string,
  userName:string,
}
@Component({
  selector: 'app-user-dialog',
  templateUrl: './users-dialog.component.html'
})
export class UsersDialogComponent implements OnInit {
  listPharse:Pharse[]=[];
  title: string = '';
  inputData: any;
  role:any;
  checkAction: any;
  dataForm: FormGroup = this.fb.group({
    id: [null],
    fullname: [null],
    username: [null],
    email:[null],
    phone: [null],
    address:[null],
    role:[null],
    status: [null],
    description:[null],
    pharseId:[null]
  });
  lstStatus: any = [];
  constructor(public modal: NgbActiveModal,
              private translateService: TranslateService,
              public userProfileService: UserProfileService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    if (this.inputData) {
      console.log('inputData:', this.checkAction);
      this.dataForm.patchValue(this.inputData);
      this.role=this.dataForm.get("role").value;
    } else {

    }
  }

  enterPassword() {
    if (this.password.value && this.rePassword.value) {
      if (this.password.value !== this.rePassword.value) {
        this.password.setErrors({passwordNotMatch: true});
      } else {
        this.password.setErrors(null);
        this.rePassword.setErrors(null);
      }
    }
  }

  enterRePassword() {
    if (this.password.value && this.rePassword.value) {
      if (this.password.value !== this.rePassword.value) {
        this.rePassword.setErrors({passwordNotMatch: true});
      } else {
        this.password.setErrors(null);
        this.rePassword.setErrors(null);
      }
    }
  }
  changeRole(){
    this.role=this.dataForm.get("role").value;
  }
  save() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return
    }

    const data = this.dataForm.value;
    this.userProfileService.insertOrUpdate(data.id, data).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '20em',
        title: data.id ? this.translateService.instant('common.message.update-success') : this.translateService.instant('common.message.insert-success'),
        showConfirmButton: false,
        timer: 2500
      });
      this.modal.close({result: 'complete'});
    }, (error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        width: '20em',
        title: error.error.message,
        showConfirmButton: false,
        timer: 2500
      });
    })
  }

  get password() {
    return this.dataForm.get('password');
  }

  get rePassword() {
    return this.dataForm.get('rePassword');
  }

}

