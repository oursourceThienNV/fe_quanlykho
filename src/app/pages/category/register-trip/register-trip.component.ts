import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {ReigisterFormService} from "../../../core/services/reigister-form.service";

@Component({
  selector: 'app-register-trip',
  templateUrl: './register-trip.component.html',
})
export class RegisterTripComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private registerFormService:ReigisterFormService
  ) {}

  ngOnInit(): void {
    // Khởi tạo form với các trường cần thiết
    this.registerForm = this.fb.group({
      fullname: [''],
      gender: [''],
      phone: [''],
      email: [''],
      address: [''],
      guests: [''],
      children: [''],
      reason: [''],
      code:['']
    });
  }

  onSubmit(): void {
    debugger;
      const formData = this.registerForm.value;
      formData.code="Code là mã tự sinh";
      // Gửi dữ liệu đến API
      this.registerFormService.insert(formData).subscribe(
        (response) => {
          Swal.fire('Thành công', 'Đăng ký của bạn đã được gửi!', 'success');
          this.registerForm.reset(); // Reset form sau khi gửi thành công
        },
        (error) => {
          Swal.fire('Thất bại', 'Có lỗi xảy ra khi gửi đăng ký!', 'error');
        }
      );
  }
}
