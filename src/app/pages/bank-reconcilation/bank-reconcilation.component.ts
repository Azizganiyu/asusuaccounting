import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { AccountTransferService } from 'src/app/services/account-transfer/account-transfer.service';
import { BankReconcilationService } from 'src/app/services/bank-reconcilation/bank-reconcilation.service';

@Component({
  selector: 'app-bank-reconcilation',
  templateUrl: './bank-reconcilation.component.html',
  styleUrls: ['./bank-reconcilation.component.scss']
})
export class BankReconcilationComponent implements OnInit {

  @ViewChild('reconcilationCreateModal', { static: true }) reconcilationCreateModal;
  @ViewChild('reconcilationEditModal', { static: true }) reconcilationEditModal;

  reconcilationForm = this.fb.group({
    account: [null, [Validators.required]],
    account_id: [null, [Validators.required]],
    account_type: [null, [Validators.required]],
    statement_balance: [0, [Validators.required]],
    date: [new Date(), [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  accounts: any = []
  loading: boolean = true
  reconcilations: any = []

  headElements = ['Date', 'Bank account', 'Statement balance', 'Discrepancy', 'status', 'Action'];

   constructor(
    private transferService: AccountTransferService,
    private fb: FormBuilder,
    private reconcilationService: BankReconcilationService,
    private helper: HelperService,
  ) {
    this.getAccounts()
    this.getReconcilations()
  }

  ngOnInit(): void {
    this.reconcilationForm.get('account').valueChanges.subscribe((val) => {
      if(val != null){
        this.reconcilationForm.patchValue({
          'account_type': val.type,
          'account_id': val.id,
        })
      }
      else{
        this.reconcilationForm.patchValue({
          'account_type': '',
          'account_id': '',
        })
      }
    })
  }

  getAccounts(){
    this.transferService.getMergedAccounts().subscribe((data: any) => {
      this.accounts = data.data
    }, (error => {
      console.log(error)
    }))
  }

  getReconcilations(){
    this.loading = true
    this.reconcilationService.getReconcilations().subscribe((data: any) => {
      console.log(data)
      this.reconcilations = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.reconcilationCreateModal.hide()
    this.reconcilationEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    this.submit = true
    console.log(this.reconcilationForm.value)
    this.reconcilationService.create(this.reconcilationForm.getRawValue()).subscribe((data: any) => {
      this.getReconcilations()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(reconcilation){
    let account = this.accounts.filter((val) => {
      return val.id == reconcilation.account_id && val.type == reconcilation.account_type
    })[0]
    this.reconcilationForm.get('account').patchValue(account)
    this.reconcilationForm.get('account_type').patchValue(reconcilation.account_type)
    this.reconcilationForm.get('account_id').patchValue(reconcilation.account_id)
    this.reconcilationForm.get('statement_balance').patchValue(reconcilation.statement_balance)
    this.reconcilationForm.get('date').patchValue(new Date(reconcilation.date))
    this.reconcilationForm.get('id').patchValue(reconcilation.id)
    this.reconcilationEditModal.show()
  }

  update(){
    this.submit = true
    this.reconcilationService.edit(this.reconcilationForm.getRawValue()).subscribe((data: any) => {
      this.getReconcilations()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Reconcilation?', 'Are you sure you want to Delete this reconcilation?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.reconcilationService.delete(this.reconcilationForm.value.id).subscribe((data: any) => {
          this.getReconcilations()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.reconcilationForm.reset()
    this.reconcilationForm.get('statement_balance').patchValue(0)
    this.reconcilationForm.get('date').patchValue(new Date())
  }

  absolute(value){
    return Math.abs(value)
  }

}
