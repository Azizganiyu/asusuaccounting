import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountInventoryService } from 'src/app/services/account-inventory/account-inventory.service';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { SaleService } from 'src/app/services/sale/sale.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.scss']
})
export class SaleInvoiceComponent implements OnInit {

  total: number = 0

  @ViewChild('saleCreateModal', { static: true }) saleCreateModal;
  @ViewChild('saleEditModal', { static: true }) saleEditModal;

  saleForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    due_date: [new Date(), [Validators.required]],
    customer: [null, [Validators.required]],
    item: [null, [Validators.required]],
    qty: [0, [Validators.required]],
    unit_price: [0, [Validators.required]],
    invoice_number: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  sales: any = []
  customers: any = []
  items: any = []

  headElements = ['Date', 'Invoice number', 'Customer', 'Invoice total', 'Balance due', 'status', 'Action'];

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private coa: ChartOfAccountService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router,
    private customerService: CustomerService,
    private inventoryService: AccountInventoryService
  ) {
    this.getItem()
    this.getCustomers()
    this.getSales()
    this.generateInvoiceNumber()
  }

  ngOnInit(): void {
    this.saleForm.get('qty').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.saleForm.get('unit_price').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.saleForm.get('item').valueChanges.subscribe((val) => {
      if(val){
        let selected = this.items.filter((item) => {
          if(item.id == val){
            return item
          }
        })[0]
        this.saleForm.patchValue({
          qty: 1,
          unit_price: selected.sales_price
        })
      }
    })
  }

  generateInvoiceNumber(){
    let number1 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number2 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number ='invoice_'+number1+'_'+number2
    this.saleForm.get('invoice_number').patchValue(number)
  }

  calculateTotal(){
    let qty = this.saleForm.get('qty').value?? 0
    let unit_price = this.saleForm.get('unit_price').value?? 0
    this.total = qty * unit_price
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

  getSales(){
    this.loading = true
    this.saleService.getSales().subscribe((data: any) => {
      console.log(data)
      this.sales = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.saleCreateModal.hide()
    this.saleEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    this.saleService.create(this.saleForm.getRawValue()).subscribe((data: any) => {
      this.getSales()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(sale){
    this.saleForm.get('customer').patchValue(sale.customer.id)
    this.saleForm.get('item').patchValue(sale.item)
    this.saleForm.get('qty').patchValue(sale.qty)
    this.saleForm.get('unit_price').patchValue(sale.unit_price)
    this.saleForm.get('invoice_number').patchValue(sale.invoice_number)
    this.saleForm.get('description').patchValue(sale.description)
    this.saleForm.get('date').patchValue(new Date(sale.date))
    this.saleForm.get('due_date').patchValue(new Date(sale.due_date))
    this.saleForm.get('id').patchValue(sale.id)
    this.saleEditModal.show()
  }

  update(){
    this.submit = true
    this.saleService.edit(this.saleForm.getRawValue()).subscribe((data: any) => {
      this.getSales()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Sale?', 'Are you sure you want to Delete this sale?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.saleService.delete(this.saleForm.value.id).subscribe((data: any) => {
          this.getSales()
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
      headElements : ['Description', 'Qty', 'Unit price', 'Total', 'Balance'],
      title: 'Sale Invoice',
      subtitle: el.description,
      date: this.helper.formatDate(el.date),
      due_date: this.helper.formatDate(el.due_date),
      invoice_number: el.invoice_number,
      name: el.customer.name,
      entry: [
        {column1: el.inventory.name, column2: el.qty, column3: el.unit_price.toLocaleString(), column4: (el.unit_price * el.qty).toLocaleString(), column5: el.balance.toLocaleString()},
      ],
      export: [
        {"Description": el.inventory.name, "Qty": el.qty, "Unit price": el.unit_price.toLocaleString(), "Total": (el.unit_price * el.qty).toLocaleString(), "Balance": el.balance.toLocaleString()},
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['sale-invoice-record'])

  }

  resetForm(){
    this.saleForm.reset()
    this.generateInvoiceNumber()
    this.saleForm.get('date').patchValue(new Date())
    this.saleForm.get('due_date').patchValue(new Date())
    this.saleForm.get('qty').patchValue(0)
    this.saleForm.get('unit_price').patchValue(0)
  }


}
