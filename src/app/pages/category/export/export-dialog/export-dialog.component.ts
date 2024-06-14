import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import {ProviderServices} from "../../../../core/services/provider.services";
import {ProductService} from "../../../../core/services/product.service";
import {ImportServices} from "../../../../core/services/import.services";
import {action} from "@circlon/angular-tree-component/lib/mobx-angular/mobx-proxy";
import {DatePipe} from "@angular/common";
import {ExportServices} from "../../../../core/services/export.services";

interface Product {
  productNo: string;
  productName: string;
  amount: number;
  price: number;
  providerNo: string,
  providerName: string
}

interface Provider {
  providerNo: string;
  providerName: string;
  amount: number;
  price: number;
}

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html'
})
export class ExportDialogComponent implements OnInit, OnChanges {

  title: string = '';
  inputData: any;
  inputList: any;
  action: any;
  dataForm: FormGroup;
  dataFormList: FormGroup;
  lstStatus: any = [];
  access: number;
  products: Product[] = [];
  providers: Provider[] = [];
  newProduct: Product = {
    productNo: "",
    productName: "",
    amount: 0,
    price: 0,
    providerNo: "",
    providerName: ""
  };

  constructor(
    public modal: NgbActiveModal,
    private translateService: TranslateService,
    public providerServices: ProviderServices,
    public productService: ProductService,
    public exportService: ExportServices,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.dataForm = this.fb.group({
      id: [null],
      code: [null],
      title: [null],
      importDate: [''],
      description: [null],
      status: [null],
      listProducts: [this.products]
    });
    this.dataFormList = this.fb.group({
      productNo: [null],
      productName: [null],
      amount: [null],
      price: [null],
      providerNo: [null],
      providerName: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    }

  ngOnInit(): void {
    if (this.action !== "create" && this.action !== "edit") {
      this.dataForm.disable();
    }
    if (this.inputData) {
        this.dataForm.patchValue(this.inputData);
        this.dataFormList.patchValue(this.inputList);
        this.products = this.inputData.listProduct || [];
      if(this.action=="edit"){
        const body={
          id:this.dataForm.get("id").value
        }
        this.exportService.getProviderByImportId(body).subscribe(res=>{
          this.products=res?.body?.body?.listProducts;
          const formattedDate = this.datePipe.transform((res?.body?.body?.importWare?.importDate), 'mm/dd/yyyy');
          this.dataForm.get('importDate')?.setValue(formattedDate);

          if(res?.body?.body?.exportWareDTO.status==1){
            this.access=1;
            this.dataForm.disable();
          }
        })
      }
    }
  }
  searchProvider(){
    debugger;
    const code=this.dataForm.get('providerNo').value;
    const body={
      "providerNo":code
    }
    this.providerServices.getProviderByProviderNo(body).subscribe(res=>{
      this.dataForm.get('providerId').setValue(res?.body?.body?.providerDTO?.id)
      this.dataForm.get('providerName').setValue(res?.body?.body?.providerDTO?.providerName);
      this.dataForm.get('email').setValue(res?.body?.body?.providerDTO?.email);
      this.dataForm.get('phoneNumber').setValue(res?.body?.body?.providerDTO?.phoneNumber);
      this.dataForm.get('address').setValue(res?.body?.body?.providerDTO?.address);
    })

  }
  searchProduct(){
    debugger;
    const code=this.dataFormList.get('productNo').value;
    const body={
      "productNo":code
    }
    this.exportService.getByProductNo(body).subscribe(res=>{
      this.dataFormList.get('productName').setValue(res?.body?.body?.productDTO?.pname);
      this.dataFormList.get('productNo').setValue(code);
      this.providers=res?.body?.body?.listProviders;
    })

  }
  addProduct() {
    debugger;
    const productNo = this.dataFormList.get('productNo').value;
    const productName = this.dataFormList.get('productName').value;
    const providerNo = this.dataFormList.get('providerNo').value;
    const providerName = this.dataFormList.get('providerName').value;
    const amount = this.dataFormList.get('amount').value;
    const price = this.dataFormList.get('price').value;

    if (this.isProductNoUnique(productNo) && this.isValidProductDetails(productNo, productName, amount, price)) {
      this.products.push({ productNo: productNo, productName: productName, amount: amount, price: price,providerNo:providerNo,providerName:providerName });
      this.newProduct = { productNo: '', productName: '', amount: 0, price: 0,providerNo:'',providerName:'' };
      this.dataFormList.reset();
      this.dataForm.get('listProducts').setValue(this.products);
    } else {
      // Handle the error case, e.g., show a message to the user
      console.error('Product number must be unique and all fields must be valid.');
    }
  }
  isProductNoUnique(productNo) {
    return !this.products.some(product => product.productNo === productNo);
  }

  isValidProductDetails(productNo, productName, amount, price) {
    return productNo.trim() && productName.trim() && amount > 0 && price > 0;
  }
  removeProduct(product: Product) {
    this.products = this.products.filter(p => p !== product);
    this.dataForm.get('listProduct').setValue(this.products);
  }

  save() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return;
    }

    this.dataForm.get("importDate").setValue(new Date(this.dataForm.get("importDate").value))
    this.dataForm.get('listProducts').setValue(this.products);
    const data = this.dataForm.value;
    this.exportService.insertOrUpdate(data).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '20em',
        title: data.id ? this.translateService.instant('common.message.update-success') : this.translateService.instant('common.message.insert-success'),
        showConfirmButton: false,
        timer: 2500
      });
      this.modal.close({ result: 'complete' });
    }, (error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        width: '20em',
        title: "Lưu không thành công vui lòng nhập đủ thông tin",
        showConfirmButton: false,
        timer: 2500
      });
    });
  }
  push() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return;
    }
    this.dataForm.get("status").setValue(1)
    this.dataForm.get("importDate").setValue(new Date(this.dataForm.get("importDate").value))
    this.dataForm.get('listProducts').setValue(this.products);
    const data = this.dataForm.value;
    this.exportService.insertOrUpdate(data).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width: '20em',
        title: data.id ? this.translateService.instant('common.message.update-success') : this.translateService.instant('common.message.insert-success'),
        showConfirmButton: false,
        timer: 2500
      });
      this.modal.close({ result: 'complete' });
    }, (error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        width: '20em',
        title: "Lưu không thành công vui lòng nhập đủ thông tin",
        showConfirmButton: false,
        timer: 2500
      });
    });
  }

  addProvider(item: Provider) {
    this.dataFormList.get("providerName").setValue(item.providerName);

  }
}
