import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../core/models/page.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as fileSaver from 'file-saver';
import {ExportDialogComponent} from "./export-dialog/export-dialog.component";
import {ImportServices} from "../../../core/services/import.services";
import {ExportServices} from "../../../core/services/export.services";

@Component({
  selector: 'app-users-list',
  templateUrl: './export-list.component.html'
})
export class ExportListComponent implements OnInit {

  breadCrumbItems = [{label: 'menu.sysMng'}, {label: 'users.title', active: true}];

  searchForm: FormGroup = this.fb.group({
    code: [null],
    title: [null],
    status: [""],
  });
  tables: any = [];
  selectedAll: boolean = false;
  page = new Page();

  constructor(private fb: FormBuilder,
              private exportServices: ExportServices,
              private translateService: TranslateService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  search() {
    this.setPage({offset: 0});
  }
  stringNullOrEmpty(value: any){
    if(value===""||value===null||value==undefined){
      return false;
    }else{
      return true;
    }
  }
  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.exportServices.search({
      pageNumber: '0',
      pageSize: 10,
      pno:this.stringNullOrEmpty(this.searchForm.get("code").value)? {contains:this.searchForm.get("code").value}:null,
      pname:this.stringNullOrEmpty(this.searchForm.get("title").value)? {contains:this.searchForm.get("title").value}:null,
    }).subscribe(res => this.onSuccess(res.body));
  }

  protected onSuccess(data: any | null): void {
    var jso = JSON.stringify(data.body.page.content);
    this.tables=data?.body?.page?.content;
    console.log(jso);

  }
  export() {

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
    const res = this.modalService.open(ExportDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Thêm mới thông tin xuất kho";
    res.componentInstance.action = "create";
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }
  edit(table) {
    const res = this.modalService.open(ExportDialogComponent, {size: 'xl', centered: true});
    res.componentInstance.title = "Cập nhật thông tin xuất kho";
    res.componentInstance.action = "edit";
    res.componentInstance.inputData = table;
    res.closed.subscribe(temp => {
      this.setPage({offset: 0})
    })
  }


}

