import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {MediaService} from "../../../core/services/services-app/media.service";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './media-dialog.component.html'
})
export class MediaDialogComponent implements OnInit {
  title: string = '';
  inputData: any;
  role:any;
  checkAction: any;
  dataForm: FormGroup = this.fb.group({
    id: [null],
    url: [null]
  });
  constructor(public modal: NgbActiveModal,
              private translateService: TranslateService,
              public mediaService: MediaService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.inputData) {
      this.dataForm.patchValue(this.inputData);
      this.role=this.dataForm.get("role").value;
    }
  }
  save() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return
    }
  }
  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null;
    }
  }




}

