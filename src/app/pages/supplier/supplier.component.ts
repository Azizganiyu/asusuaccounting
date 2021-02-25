import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  @ViewChild('supplierCreateModal', { static: true }) supplierCreateModal;
  @ViewChild('supplierEditModal', { static: true }) supplierEditModal;

  supplierForm = this.fb.group({
    name: ['', [Validators.required]],
    start_balance: [0, [Validators.required]],
    email: ['', [Validators.email]],
    identifier: [{ value: '', disabled: true }],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  suppliers: any = []

  headElements = ['Name', 'Email', 'Invoices', 'Accounts payable', 'Action'];

   constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private helper: HelperService,
  ) {
    this.generateSupplierNumber()
    this.getSuppliers()
  }

  ngOnInit(): void {
  }

  generateSupplierNumber(){
    let number1 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number2 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number ='supplier_'+number1+'_'+number2
    this.supplierForm.get('identifier').patchValue(number)
  }

  getSuppliers(){
    this.loading = true
    this.supplierService.getSuppliers().subscribe((data: any) => {
      console.log(data)
      this.suppliers = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.supplierCreateModal.hide()
    this.supplierEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.supplierForm.value)
    this.supplierService.create(this.supplierForm.getRawValue()).subscribe((data: any) => {
      this.getSuppliers()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(supplier){
    this.supplierForm.get('name').patchValue(supplier.name)
    this.supplierForm.get('email').patchValue(supplier.email)
    this.supplierForm.get('identifier').patchValue(supplier.identifier)
    this.supplierForm.get('start_balance').patchValue(supplier.start_balance)
    this.supplierForm.get('id').patchValue(supplier.id)
    this.supplierEditModal.show()
  }

  update(){
    this.submit = true
    this.supplierService.edit(this.supplierForm.getRawValue()).subscribe((data: any) => {
      this.getSuppliers()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Supplier?', 'Are you sure you want to Delete this supplier?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.supplierService.delete(this.supplierForm.value.id).subscribe((data: any) => {
          this.getSuppliers()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.supplierForm.reset()
    this.generateSupplierNumber()
    this.supplierForm.get('start_balance').patchValue(0)
  }

}
