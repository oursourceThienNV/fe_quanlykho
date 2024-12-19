import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../core/models/page.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import * as fileSaver from 'file-saver';
import {buildUnitTree} from "../../../core/utils/common";
import {UserProfileService} from "../../../core/services/user.service";
import {ReigisterFormService} from "../../../core/services/reigister-form.service";
import {RegisterFormDialogComponent} from "./register-form-dialog.component";
import {RegisterFormTravelDialogComponent} from "./register-form-travel-dialog.component";


@Component({
  selector: 'app-users',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

  breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];

  searchForm: FormGroup = this.fb.group({
    Phone: [null],
    Email: [null],
    FullName: [null]
  });
  lstProductType: any = [];
  lstGroup: any = [];
  lstDepts = [];
  lstStatus: any = [];
  tables: any = [];
  selectedAll: boolean = false;
  page = new Page();
  searchModel: any;
  userSearch:any;
  role: any;
  constructor(private fb: FormBuilder,
              private reigisterFormService: ReigisterFormService,
              private translateService: TranslateService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.role=localStorage.getItem("role");
    this.page.size = 10;
  }

  search() {
    console.log("aaa",this.searchForm.get("username").value);
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.reigisterFormService.search({
      pageNumber: '0',
      pageSize: 10,
      Phone:this.searchForm.get("Phone").value!=null?this.searchForm.get("Phone").value:"",
      FullName:this.searchForm.get("FullName").value!=null?this.searchForm.get("FullName").value:"",
    }).subscribe(res => this.onSuccess(res.body));
  }

  protected onSuccess(data: any | null): void {
    var jso = JSON.stringify(data.users);
    this.tables=data?.users
    console.log(jso);

  }
  stringNullOrEmpty(value: any){
    if(value===""||value===null||value==undefined){
      return false;
    }else{
      return true;
    }
  }


  selectAllChange() {
    this.tables = this.tables.map(e => {
      e['selected'] = this.selectedAll;
      return e
    })
  }

  changePage(page) {
    if (page) {
      this.setPage({offset: page - 1})
    }
  }

  create() {
    // const res = this.modalService.open(UsersDialogComponent, {size: 'lg', centered: true});
    // res.componentInstance.title = this.translateService.instant('users.create_title');
    // res.closed.subscribe(temp => {
    //   this.setPage({offset: 0})
    // })
  }
  edit(table) {
    const res = this.modalService.open(RegisterFormDialogComponent, {size: 'lg', centered: true});
    res.componentInstance.title = "Xử lý thông tin đăng kí";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "E";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  addTrip(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Tạo thông tin hành trình";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "CREATE";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  requestTrip(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Trình duyệt";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "REQUEST";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  editTrip(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Cập nhật thông tin hành trình";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "EDIT";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  approveTrip(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Duyệt lịch trình";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "APPROVE";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  completeTrip(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Hoàn thành chuyến đi";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "COMPLETE";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  rejectTrip(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Hủy lịch trình";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "REJECT";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  detail(table) {
    const res = this.modalService.open(RegisterFormTravelDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Chi tiết";
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "DETAIL";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }

  resetPassword(table) {
    // const res = this.modalService.open(ResetPasswordComponent, {size: 'lg', centered: true});
    // res.componentInstance.title = this.translateService.instant('users.reset_password_title');
    // res.componentInstance.inputData = table;
    // res.closed.subscribe(temp => {
    //   this.setPage({offset: 0})
    // });
  }


  delete() {
    // let deleteRows = this.tables.filter(e => e.selected === true);
    // if(deleteRows === null){
    //   return;
    // }
    // deleteRows = deleteRows.map(res => res.id);
    // Swal.fire({
    //   title: this.translateService.instant('common.confirm'),
    //   text: this.translateService.instant('map_cluster_location.delete-confirm'),
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#34c38f',
    //   cancelButtonColor: '#f46a6a',
    //   confirmButtonText: this.translateService.instant('common.button.confirm'),
    //   cancelButtonText: this.translateService.instant('common.button.cancel'),
    // }).then(result => {
    //   if (result.value) {
    //     this.userProfileService.deleteMultiSelection(deleteRows).subscribe(res => {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: this.translateService.instant('common.message.delete-success'),
    //         showConfirmButton: false,
    //         timer: 3000
    //       });
    //       this.setPage({offset: 0});
    //       this.selectedAll = false;
    //     }, error => {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: error.error.message,
    //         showConfirmButton: false,
    //         timer: 3000
    //       });
    //     });
    //   }
    // });

  }

}

