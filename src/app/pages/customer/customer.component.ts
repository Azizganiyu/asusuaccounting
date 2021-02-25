import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @ViewChild('customerCreateModal', { static: true }) customerCreateModal;
  @ViewChild('customerEditModal', { static: true }) customerEditModal;

  customerForm = this.fb.group({
    name: ['', [Validators.required]],
    start_balance: [0, [Validators.required]],
    email: ['', [Validators.email]],
    identifier: [{ value: '', disabled: true }],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  customers: any = []

  headElements = ['Name', 'Email', 'Invoices', 'Accounts receivable', 'Action'];

   constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private helper: HelperService,
  ) {
    this.generateCustomerNumber()
    this.getCustomers()
  }

  ngOnInit(): void {
  }

  generateCustomerNumber(){
    let number1 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number2 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number ='customer_'+number1+'_'+number2
    this.customerForm.get('identifier').patchValue(number)
  }

  getCustomers(){
    this.loading = true
    this.customerService.getCustomers().subscribe((data: any) => {
      console.log(data)
      this.customers = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.customerCreateModal.hide()
    this.customerEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.customerForm.value)
    this.customerService.create(this.customerForm.getRawValue()).subscribe((data: any) => {
      this.getCustomers()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(customer){
    this.customerForm.get('name').patchValue(customer.name)
    this.customerForm.get('email').patchValue(customer.email)
    this.customerForm.get('identifier').patchValue(customer.identifier)
    this.customerForm.get('start_balance').patchValue(customer.start_balance)
    this.customerForm.get('id').patchValue(customer.id)
    this.customerEditModal.show()
  }

  update(){
    this.submit = true
    this.customerService.edit(this.customerForm.getRawValue()).subscribe((data: any) => {
      this.getCustomers()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Customer?', 'Are you sure you want to Delete this customer?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.customerService.delete(this.customerForm.value.id).subscribe((data: any) => {
          this.getCustomers()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.customerForm.reset()
    this.generateCustomerNumber()
    this.customerForm.get('start_balance').patchValue(0)
  }

}
