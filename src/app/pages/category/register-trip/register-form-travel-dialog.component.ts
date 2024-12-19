import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { UserProfileService } from "../../../core/services/user.service";
import {ReigisterFormService} from "../../../core/services/reigister-form.service";

@Component({
  selector: 'app-register-form-dialog',
  templateUrl: './register-form-travel-dialog.component.html'
})
export class RegisterFormTravelDialogComponent implements OnInit {
  checkAction:string='';
  title: string = '';
  inputData: any;
  lstResponsiblePersons: any[] = []; // List of responsible persons

  // Form Initialization
  dataForm: FormGroup = this.fb.group({
    registrationID: [null, Validators.required],
    code: [null, Validators.required],
    travelName: ['', [Validators.required, Validators.maxLength(100)]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    responsiblePersonID: ['', Validators.required],
    travelDescription: ['', Validators.maxLength(4000)],
    stages: this.fb.array([]),
    status:[''],
  });

  constructor(
    public modal: NgbActiveModal,
    private translateService: TranslateService,
    private registerFormService: ReigisterFormService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    if (this.inputData) {
      this.dataForm.patchValue(this.inputData);
      this.setStages(this.inputData.stages || []);
      const requestPayload = { "role": "03", "Username": "", "FullName": "" };
      this.userProfileService.findHdv(requestPayload).subscribe(res => {
        this.lstResponsiblePersons = res.body.data;
      });
      if(this.checkAction!=='CREATE') {
        const body = {"registrationID": this.inputData.registrationID};
        this.registerFormService.listStage(body).subscribe(res => {
          const stagesArray = res.body;  // Dữ liệu từ API
          const stageFormGroups = stagesArray.map(stage => this.fb.group({
            startTime: [stage.startTime, Validators.required],
            endTime: [stage.endTime, Validators.required],
            location: [stage.location, [Validators.required, Validators.maxLength(255)]],
            description: [stage.description, Validators.maxLength(4000)]
          }));
          this.dataForm.setControl('stages', this.fb.array(stageFormGroups));  // Cập nhật lại FormArray
        });
      }
      
      if(this.checkAction==='CREATE'){
        this.dataForm.get('status').setValue("04");
      }
      if(this.checkAction==='REQUEST'){
        this.dataForm.get('status').setValue("05");
      }
      if(this.checkAction==='APPROVE'){
        this.dataForm.get('status').setValue("06");
      }
      if(this.checkAction==='REJECT'){
        this.dataForm.get('status').setValue("07");
      }
      if(this.checkAction==='COMPLETE'){
        this.dataForm.get('status').setValue("08");
      }
    }
  }

  // Getter for stages FormArray
  get stages(): FormArray {
    return this.dataForm.get('stages') as FormArray;
  }

  // Add a new stage
  addStage(): void {
    this.stages.push(this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(4000)]
    }));
  }

  // Remove a stage by index
  removeStage(index: number): void {
    this.stages.removeAt(index);
  }

  // Set stages dynamically from input data
  private setStages(stages: any[]): void {
    stages.forEach(stage => {
      this.stages.push(this.fb.group({
        startTime: [stage.startTime, Validators.required],
        endTime: [stage.endTime, Validators.required],
        location: [stage.location, [Validators.required, Validators.maxLength(255)]],
        itineraryDescription: [stage.itineraryDescription, Validators.maxLength(4000)]
      }));
    });
  }

  // Save form data
  saveTrip(): void {
    if (this.dataForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('common.message.invalid-form'),
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }

    const data = this.dataForm.value;
    this.registerFormService.createplan(data).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          width: '20em',
          title: data.registrationID
            ? this.translateService.instant('common.message.update-success')
            : this.translateService.instant('common.message.insert-success'),
          showConfirmButton: false,
          timer: 2500
        });
        this.modal.close({ result: 'complete' });
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          width: '20em',
          title: error.error.message,
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
}
