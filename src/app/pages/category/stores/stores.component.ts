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
import {MediaService} from "../../../core/services/services-app/media.service";
import {UsersDialogComponent} from "../users/users-dialog/users-dialog.component";
import {StoresService} from "../../../core/services/services-app/stores.service";


@Component({
  selector: 'app-users',
  templateUrl: './stores.component.html',
})
export class StoresComponent implements OnInit {

  // breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];
  tables: any = [];
  selectedAll: boolean = false;
  page = new Page();
  role: any;
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  constructor(private fb: FormBuilder,
              private mediaService: MediaService,
              private storeService: StoresService,
              private translateService: TranslateService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.role=localStorage.getItem("role");
    this.loadPage(0);
  }

  search() {
    this.loadPage(this.currentPage);
  }

  protected onSuccess(data: any | null): void {
    var jso = JSON.stringify(data.body.page.content);
    this.tables=data?.body?.page?.content;
    this.totalPages = data.body.page.totalPages;
    this.totalElements = data.body.page.totalElements;
    this.currentPage = data.body.page.currentPage;

  }
  searchForm: FormGroup = this.fb.group({
    code: [null],
    name: [null],
    status: [""],
  });
  loadPage(page: number): void {
    this.storeService.search({
      pageNumber: page,
      pageSize: 10,
      code:this.stringNullOrEmpty(this.searchForm.get("code").value)? {contains:this.searchForm.get("code").value}:null,
      name:this.stringNullOrEmpty(this.searchForm.get("name").value)? {contains:this.searchForm.get("name").value}:null,
      status:this.stringNullOrEmpty(this.searchForm.get("status").value)? {contains:this.searchForm.get("status").value}:null,
    }).subscribe(res => this.onSuccess(res.body));
  }
  stringNullOrEmpty(value: any){
    if(value===""||value===null||value==undefined){
      return false;
    }else{
      return true;
    }
  }
  create() {
    // const res = this.modalService.open(MediaDialogComponent, {size: 'lg', centered: true});
    // res.componentInstance.title = 'Upload file';
    // res.closed.subscribe(temp => {
    //   this.loadPage(this.currentPage)
    // })
  }
}

