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
// import {UsersDialogComponent} from "./users-dialog/users-dialog.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { UserSearch } from './user.search.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];

  searchForm: FormGroup = this.fb.group({
    username: [null],
    fullname: [null],
    status: [""],
    phone:[null],
    role: [""]
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
              private userProfileService: UserProfileService,
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
    this.userProfileService.search({
      pageNumber: '0',
      pageSize: 10,
      username:this.stringNullOrEmpty(this.searchForm.get("username").value)? {contains:this.searchForm.get("username").value}:null,
      fullname:this.stringNullOrEmpty(this.searchForm.get("fullname").value)? {contains:this.searchForm.get("fullname").value}:null,
      role:this.stringNullOrEmpty(this.searchForm.get("role").value)? {contains:this.searchForm.get("role").value}:null,
      status:this.stringNullOrEmpty(this.searchForm.get("status").value)? {contains:this.searchForm.get("status").value}:null,
    }).subscribe(res => this.onSuccess(res.body));
  }

  protected onSuccess(data: any | null): void {
    var jso = JSON.stringify(data.body.page.content); 
    this.tables=data?.body?.page?.content;
    console.log(jso);
    
  }
  stringNullOrEmpty(value: any){
    if(value===""||value===null||value==undefined){
      return false;
    }else{
      return true;
    }
  }
  export() {
    // this.userProfileService.export(this.searchForm.value).subscribe(res => {
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     width: '20em',
    //     title: this.translateService.instant('alert.success-download'),
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //   const name = res.headers.get('filename');
    //   const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //   this.saveFile(res.body, name, contentType);
    // });
  }
  saveFile(data: any, filename?: string, contentType?: string) {
    const blob = new Blob([data], {type: contentType});
    fileSaver.saveAs(blob, filename);
  }

  selectAllChange() {
    this.tables = this.tables.map(e => {
      e['selected'] = this.selectedAll;
      return e
    })
  }
  deleteCheck(tables: any) {
    if (tables.filter(e => e.selected === true).length === 0) {
      return true
    } else return false
  }

  changePage(page) {
    if (page) {
      this.setPage({offset: page - 1})
    }
  }

  create() {
    const res = this.modalService.open(UsersDialogComponent, {size: 'lg', centered: true});
    res.componentInstance.title = this.translateService.instant('users.create_title');
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  edit(table) {
    const res = this.modalService.open(UsersDialogComponent, {size: 'lg', centered: true});
    res.componentInstance.title = this.translateService.instant('users.update_title');
    res.componentInstance.inputData = table;
    res.componentInstance.role=this.role;
    res.componentInstance.checkAction = "E";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }

  resetPassword(table) {
    const res = this.modalService.open(ResetPasswordComponent, {size: 'lg', centered: true});
    res.componentInstance.title = this.translateService.instant('users.reset_password_title');
    res.componentInstance.inputData = table;
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    });
  }


  delete() {
    let deleteRows = this.tables.filter(e => e.selected === true);
    if(deleteRows === null){
      return;
    }
    deleteRows = deleteRows.map(res => res.id);
    Swal.fire({
      title: this.translateService.instant('common.confirm'),
      text: this.translateService.instant('map_cluster_location.delete-confirm'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: this.translateService.instant('common.button.confirm'),
      cancelButtonText: this.translateService.instant('common.button.cancel'),
    }).then(result => {
      if (result.value) {
        this.userProfileService.deleteMultiSelection(deleteRows).subscribe(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: this.translateService.instant('common.message.delete-success'),
            showConfirmButton: false,
            timer: 3000
          });
          this.setPage({offset: 0});
          this.selectedAll = false;
        }, error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 3000
          });
        });
      }
    });

  }

}

