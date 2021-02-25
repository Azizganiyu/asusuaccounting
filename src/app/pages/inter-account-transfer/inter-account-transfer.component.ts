import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountTransferService } from 'src/app/services/account-transfer/account-transfer.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-inter-account-transfer',
  templateUrl: './inter-account-transfer.component.html',
  styleUrls: ['./inter-account-transfer.component.scss']
})
export class InterAccountTransferComponent implements OnInit {

  @ViewChild('transferCreateModal', { static: true }) transferCreateModal;
  @ViewChild('transferEditModal', { static: true }) transferEditModal;

  transferForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    paid_from: ['', [Validators.required]],
    paid_from_account: ['', [Validators.required]],
    paid_from_id: ['', [Validators.required]],
    received_in: ['', [Validators.required]],
    received_in_account: ['', [Validators.required]],
    received_in_id: ['', [Validators.required]],
    amount: [0, [Validators.required]],
    description: [''],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  transfers: any = []
  accounts: any = []

  headElements = ['Date', 'Paid from', 'Received in', 'Description', 'Amount', 'Action'];

   constructor(
    private fb: FormBuilder,
    private transferService: AccountTransferService,
    private helper: HelperService,
    private dataService: DataStorageService,
    private router: Router
  ) {
    this.getAccounts()
    this.getTransfers()
  }

  ngOnInit(): void {
    this.transferForm.get('paid_from').valueChanges.subscribe((val) => {
      if(val != null){
        this.transferForm.patchValue({
          'paid_from_account': val.type,
          'paid_from_id': val.id,
        })
      }
      else{
        this.transferForm.patchValue({
          'paid_from_account': '',
          'paid_from_id': '',
        })
      }
    })
    this.transferForm.get('received_in').valueChanges.subscribe((val) => {
      if(val != null){
        this.transferForm.patchValue({
          'received_in_account': val.type,
          'received_in_id': val.id,
        })
      }
      else{
        this.transferForm.patchValue({
          'received_in_account': '',
          'received_in_id': '',
        })
      }
    })
  }

  getAccounts(){
    this.transferService.getMergedAccounts().subscribe((data: any) => {
      console.log(data)
      this.accounts = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  getTransfers(){
    this.loading = true
    this.transferService.getTransfers().subscribe((data: any) => {
      console.log(data)
      this.transfers = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.transferCreateModal.hide()
    this.transferEditModal.hide()
    this.transferForm.reset()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.transferForm.value)
    this.transferService.create(this.transferForm.value).subscribe((data: any) => {
      this.getTransfers()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(transfer){
    let paid_from = this.accounts.filter((val) => {
      return val.id == transfer.paid_from_id && val.type == transfer.paid_from_account
    })[0]

    let received_in = this.accounts.filter((val) => {
      return val.id == transfer.received_in_id && val.type == transfer.received_in_account
    })[0]

    this.transferForm.get('paid_from').patchValue(paid_from)
    this.transferForm.get('received_in').patchValue(received_in)
    this.transferForm.get('paid_from_account').patchValue(transfer.paid_from_account)
    this.transferForm.get('paid_from_id').patchValue(transfer.paid_from_id)
    this.transferForm.get('received_in_account').patchValue(transfer.received_in_account)
    this.transferForm.get('received_in_id').patchValue(transfer.received_in_id)
    this.transferForm.get('amount').patchValue(transfer.amount)
    this.transferForm.get('date').patchValue(new Date(transfer.date))
    this.transferForm.get('description').patchValue(transfer.description)
    this.transferForm.get('id').patchValue(transfer.id)
    this.transferEditModal.show()
  }

  update(){
    this.submit = true
    this.transferService.edit(this.transferForm.value).subscribe((data: any) => {
      this.getTransfers()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Transfer?', 'Are you sure you want to Delete this transfer?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.transferService.delete(this.transferForm.value.id).subscribe((data: any) => {
          this.getTransfers()
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
      headElements : ['Account', 'Outflows', 'Inflows'],
      title: 'Inter Account Transfer',
      subtitle: el.description,
      date: this.helper.formatDate(el.date),
      entry: [
        {column1: el.paid_from.name, column2: el.amount, column3: ''},
        {column1: el.received_in.name, column2: '', column3: el.amount}
      ],
      export: [
        {"Account": el.paid_from.name, "Outflows": el.amount, "Inflows": ''},
        {"Account": el.received_in.name, "Outflows": '', "Inflows": el.amount}
      ]
    }

    this.dataService.reportData = data
    this.router.navigate(['inter-account-record'])

  }

}
