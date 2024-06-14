import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ProductService } from 'src/app/core/services/product.service';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html'
})
export class ProductDialogComponent implements OnInit {

  title: string = '';
  inputData: any;
  action: any;
  dataForm: FormGroup = this.fb.group({
    id: [null],
    pno: [null],
    pname: [null],
    description: [null],
    amount:[null]
  });
  lstAuthority: any = [];
  lstStatus: any = [];
  lstUnitRequest = [];

  constructor(public modal: NgbActiveModal,
              private translateService: TranslateService,
              public productService: ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    debugger;
    if(this.action!=="create"&&this.action!=="edit"){
        this.dataForm.disable();
    }
    if (this.inputData) {
      this.dataForm.patchValue(this.inputData);
    } else {

    }
  }

  // enterPassword() {
  //   if (this.password.value && this.rePassword.value) {
  //     if (this.password.value !== this.rePassword.value) {
  //       this.password.setErrors({passwordNotMatch: true});
  //     } else {
  //       this.password.setErrors(null);
  //       this.rePassword.setErrors(null);
  //     }
  //   }
  // }
  //
  // enterRePassword() {
  //   if (this.password.value && this.rePassword.value) {
  //     if (this.password.value !== this.rePassword.value) {
  //       this.rePassword.setErrors({passwordNotMatch: true});
  //     } else {
  //       this.password.setErrors(null);
  //       this.rePassword.setErrors(null);
  //     }
  //   }
  // }

  save() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return
    }
    // const date = new Date(this.dataForm.get("decisionDate").value);
    // this.dataForm.get("decisionDate").setValue(date);
    const data = this.dataForm.value;
    this.productService.insertOrUpdate(data.id, data).subscribe(res => {
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
}

