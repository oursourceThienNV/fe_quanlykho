import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {ReigisterFormService} from "../../../core/services/reigister-form.service";

@Component({
  selector: 'app-register-trip',
  templateUrl: './success-trip.component.html',
})
export class SuccessTripComponent implements OnInit {
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
    formData.code = "Code là mã tự sinh";

    // Gửi dữ liệu đến API
    this.registerFormService.insert(formData).subscribe(
      (response) => {
        // Nếu gửi thành công, chuyển hướng đến URL
        Swal.fire('Thành công', 'Đăng ký thành công!', 'success').then(() => {
          const redirectUrl = `${window.location.origin}/account/success-trip`; // Thêm đường dẫn tùy chỉnh sau domain
          window.location.href = redirectUrl;
        });
      },
      (error) => {
        Swal.fire('Thất bại', 'Có lỗi xảy ra khi gửi đăng ký!', 'error');
      }
    );
  }
}
