import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountInventoryService } from 'src/app/services/account-inventory/account-inventory.service';
import { AccountTransferService } from 'src/app/services/account-transfer/account-transfer.service';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  total: number = 0
  payee_type: any
  payment_type: any

  @ViewChild('paymentCreateModal', { static: true }) paymentCreateModal;
  @ViewChild('paymentEditModal', { static: true }) paymentEditModal;

  paymentForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    paid_from: ['', [Validators.required]],
    paid_from_account: ['', [Validators.required]],
    paid_from_id: ['', [Validators.required]],
    item: [null],
    qty: [0, [Validators.required]],
    unit_price: [0, [Validators.required]],
    payee_type: [''],
    payment_type: ['', [Validators.required]],
    supplier_payable: [''],
    invoice_payable: [''],
    coa: [''],
    payee: [''],
    payment_number: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    id: [''],
  })

  //item, invoice_payable, supplier_payable, coa

  submit: boolean = false

  loading: boolean = true
  payments: any = []
  suppliers: any = []
  customers: any = []
  items: any = []
  accounts: any = []
  purchases: any = []
  invoices: any = []
  coas: any []

  headElements = ['Date', 'Description', 'Payer', 'Account', 'Amount paid', 'Action'];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private coa: ChartOfAccountService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router,
    private supplierService: SupplierService,
    private customerService: CustomerService,
    private inventoryService: AccountInventoryService,
    private transferService: AccountTransferService,
    private purchaseService: PurchaseService,
  ) {
    this.generatePaymentNumber()
    this.getItem()
    this.getSuppliers()
    this.getCustomers()
    this.getAccounts()
    this.getPurchases()
    this.getCoas()
    this.getPayments()
  }

  ngOnInit(): void {
    this.paymentForm.get('paid_from').valueChanges.subscribe((val) => {
      if(val != null){
        this.paymentForm.patchValue({
          'paid_from_account': val.type,
          'paid_from_id': val.id,
        })
      }
      else{
        this.paymentForm.patchValue({
          'paid_from_account': '',
          'paid_from_id': '',
        })
      }
    })

    this.paymentForm.get('supplier_payable').valueChanges.subscribe((val) => {
     if(val){
      this.invoices = this.purchases.filter((value) => {
        if(value.supplier.id == val){
          return value
        }
      })
     }
    })

    // this.paymentForm.get('invoice_payable').valueChanges.subscribe((val) => {
    //   if(val){
    //     let invoice = this.purchases.filter((value) => {
    //       return value.id == val
    //     })[0]
    //     this.paymentForm.patchValue({
    //       qty: 1,
    //       unit_price: invoice.balance
    //     })
    //   }
    // })

    this.paymentForm.get('payee_type').valueChanges.subscribe((val) => {
      this.paymentForm.get('payee').reset()
      this.payee_type = val
    })

    this.paymentForm.get('payment_type').valueChanges.subscribe((val) => {
      this.selectPaymentType(val)
    })

    this.paymentForm.get('qty').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.paymentForm.get('unit_price').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.paymentForm.get('item').valueChanges.subscribe((val) => {
      if(val){
        let selected = this.items.filter((item) => {
          if(item.id == val){
            return item
          }
        })[0]
        this.paymentForm.patchValue({
          qty: 1,
          unit_price: selected.sales_price
        })
      }
    })
  }

  getCoas(){
    this.coa.getSubs().subscribe((data : any) => {
      console.log(data.data)
      if(data.data){
        this.coas = data.data
      }
    }, (error) => {
      console.log(error)
    })
  }

  getPurchases(){
    this.purchaseService.getPurchases().subscribe((data: any) => {
      console.log(data)
      this.purchases = data.data
    }, (error => {
      console.log(error)
    }))
  }

  generatePaymentNumber(){
    let number1 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number2 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number ='payment_'+number1+'_'+number2
    this.paymentForm.get('payment_number').patchValue(number)
  }

  calculateTotal(){
    let qty = this.paymentForm.get('qty').value?? 0
    let unit_price = this.paymentForm.get('unit_price').value?? 0
    this.total = qty * unit_price
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe((data: any) => {
      this.suppliers = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((data: any) => {
      this.customers = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getItem(){
    this.inventoryService.getInventories().subscribe((data: any) => {
      this.items = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getAccounts(){
    this.transferService.getMergedAccounts().subscribe((data: any) => {
      console.log(data)
      this.accounts = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getPayments(){
    this.loading = true
    this.paymentService.getPayments().subscribe((data: any) => {
      console.log(data)
      this.payments = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.paymentCreateModal.hide()
    this.paymentEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    this.paymentService.create(this.paymentForm.getRawValue()).subscribe((data: any) => {
      this.getPayments()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(payment){

    let paid_from = this.accounts.filter((val) => {
      return val.id == payment.paid_from_id && val.type == payment.paid_from_account
    })[0]

    this.paymentForm.get('date').patchValue(new Date(payment.date))
    this.paymentForm.get('paid_from').patchValue(paid_from)
    this.paymentForm.get('paid_from_account').patchValue(payment.paid_from_account)
    this.paymentForm.get('paid_from_id').patchValue(payment.paid_from_id)
    this.paymentForm.get('description').patchValue(payment.description)
    this.paymentForm.get('payment_number').patchValue(payment.payment_number)
    this.paymentForm.get('payee_type').patchValue(payment.payee_type)
    if(payment.payee_type == 'supplier' || payment.payee_type == 'customer'){
      this.paymentForm.get('payee').patchValue(parseInt(payment.payee))
    }
    else{
      this.paymentForm.get('payee').patchValue(payment.payee)
    }
    this.paymentForm.get('payment_type').patchValue(payment.payment_type)
    this.paymentForm.get('item').patchValue(payment.item)
    this.paymentForm.get('coa').patchValue(payment.coa)
    this.paymentForm.get('supplier_payable').patchValue(payment.supplier_payable)
    this.paymentForm.get('invoice_payable').patchValue(payment.invoice_payable)
    this.paymentForm.get('qty').patchValue(payment.qty)
    this.paymentForm.get('unit_price').patchValue(payment.unit_price)
    this.paymentForm.get('id').patchValue(payment.id)
    this.paymentEditModal.show()
  }

  update(){
    this.submit = true
    this.paymentService.edit(this.paymentForm.getRawValue()).subscribe((data: any) => {
      this.getPayments()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Payment?', 'Are you sure you want to Delete this payment?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.paymentService.delete(this.paymentForm.value.id).subscribe((data: any) => {
          this.getPayments()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  view(el){

    let data = {
      headElements : ['Description', 'Qty', 'Unit price', 'Total'],
      title: 'Payment',
      subtitle: el.description,
      date: this.helper.formatDate(el.date),
      payment_number: el.payment_number,
      name: el.payee_name,
      entry: [
        {column1: this.getPaymentType(el), column2: el.qty, column3: el.unit_price.toLocaleString(), column4: (el.unit_price * el.qty).toLocaleString()},
      ],
      export: [
        {"Description": this.getPaymentType(el), "Qty": el.qty, "Unit price": el.unit_price.toLocaleString(), "Total": (el.unit_price * el.qty).toLocaleString()},
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['payment-record'])

  }

  resetForm(){
    this.paymentForm.reset()
    this.generatePaymentNumber()
    this.paymentForm.get('date').patchValue(new Date())
    this.paymentForm.get('qty').patchValue(0)
    this.paymentForm.get('unit_price').patchValue(0)
  }

  selectPaymentType(val){
      this.paymentForm.get('coa').clearValidators()
      this.paymentForm.get('supplier_payable').clearValidators()
      this.paymentForm.get('invoice_payable').clearValidators()
      this.paymentForm.get('item').clearValidators()
      this.paymentForm.get('supplier_payable').reset()
      this.paymentForm.get('invoice_payable').reset()
      this.paymentForm.get('coa').reset()
      this.paymentForm.get('item').reset()
    if(val == 'item'){
      this.paymentForm.get('item').setValidators(Validators.required)
    }

    if(val == 'account payable'){
      this.paymentForm.get('supplier_payable').setValidators(Validators.required)
      this.paymentForm.get('invoice_payable').setValidators(Validators.required)
    }

    if(val == 'coa'){
      this.paymentForm.get('coa').setValidators(Validators.required)
    }

    this.payment_type = val
  }

  getPaymentType(payment){
    if(payment.payment_type == 'item'){
      return payment.inventory.name
    }
    else if(payment.payment_type == 'account payable'){
      return 'Accounts payable - '+payment.supplier.name+' - Purchase Invoice - '+payment.invoice.invoice_number
    }
    else if(payment.payment_type == 'coa'){
      return payment.account.name
    }
    else{
      return 'unknown'
    }
  }
}
