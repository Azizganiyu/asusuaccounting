import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountInventoryService } from 'src/app/services/account-inventory/account-inventory.service';
import { AccountTransferService } from 'src/app/services/account-transfer/account-transfer.service';
import { CapitalAccountService } from 'src/app/services/capital-account/capital-account.service';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { FixedAssetService } from 'src/app/services/fixed-asset/fixed-asset.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { IntangibleAssetService } from 'src/app/services/intangible-asset/intangible-asset.service';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
import { SaleService } from 'src/app/services/sale/sale.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {

  total: number = 0
  payer_type: any
  receipt_type: any

  @ViewChild('receiptCreateModal', { static: true }) receiptCreateModal;
  @ViewChild('receiptEditModal', { static: true }) receiptEditModal;

  receiptForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    received_in: [null, [Validators.required]],
    received_in_account: [null, [Validators.required]],
    received_in_id: [null, [Validators.required]],
    item: [null],
    qty: [0, [Validators.required]],
    unit_price: [0, [Validators.required]],
    payer_type: [null],
    receipt_type: [null, [Validators.required]],
    customer_receivable: [null],
    invoice_receivable: [null],
    coa: [null],
    payer: [''],
    receipt_number: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    capital_account: [null],
    fixed_asset: [null],
    intangible_asset: [null],
    id: [''],
  })

  //item, invoice_receivable, customer_receivable, coa

  submit: boolean = false

  loading: boolean = true
  receipts: any = []
  suppliers: any = []
  customers: any = []
  items: any = []
  accounts: any = []
  sales: any = []
  invoices: any = []
  coas: any []
  capitalAccounts: any []
  fixedAssets: any []
  intangibleAssets: any []

  headElements = ['Date', 'Description', 'Payer', 'Account', 'Amount Received', 'Action'];

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private coa: ChartOfAccountService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router,
    private supplierService: SupplierService,
    private customerService: CustomerService,
    private inventoryService: AccountInventoryService,
    private transferService: AccountTransferService,
    private saleService: SaleService,
    private intangibleAssetService: IntangibleAssetService,
    private fixedAssetService: FixedAssetService,
    private capitalService: CapitalAccountService,
  ) {
    this.generateReceiptNumber()
    this.getItem()
    this.getSuppliers()
    this.getCustomers()
    this.getAccounts()
    this.getSales()
    this.getCoas()
    this.getReceipts()
    this.getIntangibleAssets()
    this.getFixedAssets()
    this.getCapitalAccounts()
  }

  ngOnInit(): void {
    this.receiptForm.get('received_in').valueChanges.subscribe((val) => {
      if(val != null){
        this.receiptForm.patchValue({
          'received_in_account': val.type,
          'received_in_id': val.id,
        })
      }
      else{
        this.receiptForm.patchValue({
          'received_in_account': '',
          'received_in_id': '',
        })
      }
    })

    this.receiptForm.get('customer_receivable').valueChanges.subscribe((val) => {
     if(val){
      this.invoices = this.sales.filter((value) => {
        if(value.customer.id == val){
          return value
        }
      })
     }
    })

    // this.receiptForm.get('invoice_receivable').valueChanges.subscribe((val) => {
    //   if(val){
    //     let invoice = this.sales.filter((value) => {
    //       return value.id == val
    //     })[0]
    //     this.receiptForm.patchValue({
    //       qty: 1,
    //       unit_price: invoice.balance
    //     })
    //   }
    // })

    this.receiptForm.get('payer_type').valueChanges.subscribe((val) => {
      this.receiptForm.get('payer').reset()
      this.payer_type = val
    })

    this.receiptForm.get('receipt_type').valueChanges.subscribe((val) => {
      this.selectReceiptType(val)
    })

    this.receiptForm.get('qty').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.receiptForm.get('unit_price').valueChanges.subscribe((val) => {
      this.calculateTotal()
    })
    this.receiptForm.get('item').valueChanges.subscribe((val) => {
      if(val){
        let selected = this.items.filter((item) => {
          if(item.id == val){
            return item
          }
        })[0]
        this.receiptForm.patchValue({
          qty: 1,
          unit_price: selected.sales_price
        })
      }
    })
  }

  getIntangibleAssets(){
    this.intangibleAssetService.getAssets().subscribe((data: any) => {
      this.intangibleAssets = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getFixedAssets(){
    this.fixedAssetService.getAssets().subscribe((data: any) => {
      this.fixedAssets = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getCapitalAccounts(){
    this.capitalService.getCapitals().subscribe((data: any) => {
      this.capitalAccounts = data.data
    }, (error => {
      console.log(error)
    }))
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

  getSales(){
    this.saleService.getSales().subscribe((data: any) => {
      console.log(data)
      this.sales = data.data
    }, (error => {
      console.log(error)
    }))
  }

  generateReceiptNumber(){
    let number1 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number2 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number ='receipt_'+number1+'_'+number2
    this.receiptForm.get('receipt_number').patchValue(number)
  }

  calculateTotal(){
    let qty = this.receiptForm.get('qty').value?? 0
    let unit_price = this.receiptForm.get('unit_price').value?? 0
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

  getReceipts(){
    this.loading = true
    this.receiptService.getReceipts().subscribe((data: any) => {
      console.log(data)
      this.receipts = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.receiptCreateModal.hide()
    this.receiptEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    this.receiptService.create(this.receiptForm.getRawValue()).subscribe((data: any) => {
      this.getReceipts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(receipt){

    let received_in = this.accounts.filter((val) => {
      return val.id == receipt.received_in_id && val.type == receipt.received_in_account
    })[0]

    this.receiptForm.get('date').patchValue(new Date(receipt.date))
    this.receiptForm.get('received_in').patchValue(received_in)
    this.receiptForm.get('received_in_account').patchValue(receipt.received_in_account)
    this.receiptForm.get('received_in_id').patchValue(receipt.received_in_id)
    this.receiptForm.get('description').patchValue(receipt.description)
    this.receiptForm.get('receipt_number').patchValue(receipt.receipt_number)
    this.receiptForm.get('payer_type').patchValue(receipt.payer_type)
    if(receipt.payer_type == 'supplier' || receipt.payer_type == 'customer'){
      this.receiptForm.get('payer').patchValue(parseInt(receipt.payer))
    }
    else{
      this.receiptForm.get('payer').patchValue(receipt.payer)
    }
    this.receiptForm.get('receipt_type').patchValue(receipt.receipt_type)
    this.receiptForm.get('item').patchValue(receipt.item)
    this.receiptForm.get('capital_account').patchValue(receipt.capital_account)
    this.receiptForm.get('fixed_asset').patchValue(receipt.fixed_asset)
    this.receiptForm.get('intangible_asset').patchValue(receipt.intangible_asset)
    this.receiptForm.get('coa').patchValue(receipt.coa)
    this.receiptForm.get('customer_receivable').patchValue(receipt.customer_receivable)
    this.receiptForm.get('invoice_receivable').patchValue(receipt.invoice_receivable)
    this.receiptForm.get('qty').patchValue(receipt.qty)
    this.receiptForm.get('unit_price').patchValue(receipt.unit_price)
    this.receiptForm.get('id').patchValue(receipt.id)
    this.receiptEditModal.show()
  }

  update(){
    this.submit = true
    this.receiptService.edit(this.receiptForm.getRawValue()).subscribe((data: any) => {
      this.getReceipts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Receipt?', 'Are you sure you want to Delete this receipt?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.receiptService.delete(this.receiptForm.value.id).subscribe((data: any) => {
          this.getReceipts()
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
      title: 'Receipt',
      subtitle: el.description,
      date: this.helper.formatDate(el.date),
      receipt_number: el.receipt_number,
      name: el.payer_name,
      entry: [
        {column1: this.getReceiptType(el), column2: el.qty, column3: el.unit_price.toLocaleString(), column4: (el.unit_price * el.qty).toLocaleString()},
      ],
      export: [
        {"Description": this.getReceiptType(el), "Qty": el.qty, "Unit price": el.unit_price.toLocaleString(), "Total": (el.unit_price * el.qty).toLocaleString()},
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['receipt-record'])

  }

  resetForm(){
    this.receiptForm.reset()
    this.generateReceiptNumber()
    this.receiptForm.get('date').patchValue(new Date())
    this.receiptForm.get('qty').patchValue(0)
    this.receiptForm.get('unit_price').patchValue(0)
  }

  selectReceiptType(val){
      this.receiptForm.get('coa').clearValidators()
      this.receiptForm.get('customer_receivable').clearValidators()
      this.receiptForm.get('invoice_receivable').clearValidators()
      this.receiptForm.get('item').clearValidators()
      this.receiptForm.get('capital_account').clearValidators()
      this.receiptForm.get('fixed_asset').clearValidators()
      this.receiptForm.get('intangible_asset').clearValidators()
      this.receiptForm.get('capital_account').reset()
      this.receiptForm.get('fixed_asset').reset()
      this.receiptForm.get('intangible_asset').reset()
      this.receiptForm.get('customer_receivable').reset()
      this.receiptForm.get('invoice_receivable').reset()
      this.receiptForm.get('coa').reset()
      this.receiptForm.get('item').reset()
    if(val == 'item'){
      this.receiptForm.get('item').setValidators(Validators.required)
    }

    if(val == 'capital account'){
      this.receiptForm.get('capital_account').setValidators(Validators.required)
    }

    if(val == 'fixed asset'){
      this.receiptForm.get('fixed_asset').setValidators(Validators.required)
    }

    if(val == 'intangible_asset'){
      this.receiptForm.get('intangible_asset').setValidators(Validators.required)
    }

    if(val == 'account receivable'){
      this.receiptForm.get('customer_receivable').setValidators(Validators.required)
      this.receiptForm.get('invoice_receivable').setValidators(Validators.required)
    }

    if(val == 'coa'){
      this.receiptForm.get('coa').setValidators(Validators.required)
    }

    this.receipt_type = val
  }

  getReceiptType(receipt){
    if(receipt.receipt_type == 'item'){
      return receipt.inventory.name
    }
    else if(receipt.receipt_type == 'account receivable'){
      return 'Accounts receivable - '+receipt.supplier.name+' - Sale Invoice - '+receipt.invoice.invoice_number
    }
    else if(receipt.receipt_type == 'capital account'){
      return 'Capital account - '+receipt.capital.name
    }
    else if(receipt.receipt_type == 'fixed asset'){
      return 'Fixed asset, at cost - '+receipt.fixed.name
    }
    else if(receipt.receipt_type == 'intangible asset'){
      return 'Intangible asset, at cost - '+receipt.intangible.name
    }
    else if(receipt.receipt_type == 'coa'){
      return receipt.account.name
    }
    else{
      return 'unknown'
    }
  }

}
