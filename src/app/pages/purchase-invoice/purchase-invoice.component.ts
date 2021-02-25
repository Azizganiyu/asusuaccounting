import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountInventoryService } from 'src/app/services/account-inventory/account-inventory.service';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss']
})
export class PurchaseInvoiceComponent implements OnInit {

  total: number = 0

  @ViewChild('purchaseCreateModal', { static: true }) purchaseCreateModal;
  @ViewChild('purchaseEditModal', { static: true }) purchaseEditModal;

  purchaseForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    due_date: [new Date(), [Validators.required]],
    supplier: [null, [Validators.required]],
    item: [null, [Validators.required]],
    qty: [0, [Validators.required]],
    unit_price: [0, [Validators.required]],
    invoice_number: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  purchases: any = []
  suppliers: any = []
  items: any = []

  headElements = ['Date', 'Invoice number', 'Supplier', 'Invoice total', 'Balance due', 'status', 'Action'];

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private coa: ChartOfAccountService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router,
    private supplierService: SupplierService,
    private inventoryService: AccountInventoryService
  ) {
    this.getItem()
    this.getSuppliers()
    this.getPurchases()
    this.generateInvoiceNumber()
  }

  ngOnInit(): void {
    this.purchaseForm.get('qty').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.purchaseForm.get('unit_price').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.purchaseForm.get('item').valueChanges.subscribe((val) => {
      if(val){
        let selected = this.items.filter((item) => {
          if(item.id == val){
            return item
          }
        })[0]
        this.purchaseForm.patchValue({
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
    this.purchaseForm.get('invoice_number').patchValue(number)
  }

  calculateTotal(){
    let qty = this.purchaseForm.get('qty').value?? 0
    let unit_price = this.purchaseForm.get('unit_price').value?? 0
    this.total = qty * unit_price
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe((data: any) => {
      this.suppliers = data.data
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

  getPurchases(){
    this.loading = true
    this.purchaseService.getPurchases().subscribe((data: any) => {
      console.log(data)
      this.purchases = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.purchaseCreateModal.hide()
    this.purchaseEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    this.purchaseService.create(this.purchaseForm.getRawValue()).subscribe((data: any) => {
      this.getPurchases()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(purchase){
    this.purchaseForm.get('supplier').patchValue(purchase.supplier.id)
    this.purchaseForm.get('item').patchValue(purchase.item)
    this.purchaseForm.get('qty').patchValue(purchase.qty)
    this.purchaseForm.get('unit_price').patchValue(purchase.unit_price)
    this.purchaseForm.get('invoice_number').patchValue(purchase.invoice_number)
    this.purchaseForm.get('description').patchValue(purchase.description)
    this.purchaseForm.get('date').patchValue(new Date(purchase.date))
    this.purchaseForm.get('due_date').patchValue(new Date(purchase.due_date))
    this.purchaseForm.get('id').patchValue(purchase.id)
    this.purchaseEditModal.show()
  }

  update(){
    this.submit = true
    this.purchaseService.edit(this.purchaseForm.getRawValue()).subscribe((data: any) => {
      this.getPurchases()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Purchase?', 'Are you sure you want to Delete this purchase?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.purchaseService.delete(this.purchaseForm.value.id).subscribe((data: any) => {
          this.getPurchases()
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
      title: 'Purchase Invoice',
      subtitle: el.description,
      date: this.helper.formatDate(el.date),
      due_date: this.helper.formatDate(el.due_date),
      invoice_number: el.invoice_number,
      name: el.supplier.name,
      entry: [
        {column1: el.inventory.name, column2: el.qty, column3: el.unit_price.toLocaleString(), column4: (el.unit_price * el.qty).toLocaleString(), column5: el.balance.toLocaleString()},
      ],
      export: [
        {"Description": el.inventory.name, "Qty": el.qty, "Unit price": el.unit_price.toLocaleString(), "Total": (el.unit_price * el.qty).toLocaleString(), "Balance": el.balance.toLocaleString()},
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['purchase-invoice-record'])

  }

  resetForm(){
    this.purchaseForm.reset()
    this.generateInvoiceNumber()
    this.purchaseForm.get('date').patchValue(new Date())
    this.purchaseForm.get('due_date').patchValue(new Date())
    this.purchaseForm.get('qty').patchValue(0)
    this.purchaseForm.get('unit_price').patchValue(0)
  }

}
