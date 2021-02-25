import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankAccountService } from 'src/app/services/bank-account/bank-account.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {

  @ViewChild('accountCreateModal', { static: true }) accountCreateModal;
  @ViewChild('accountEditModal', { static: true }) accountEditModal;

  accountForm = this.fb.group({
    name: ['', [Validators.required]],
    start_balance: [0, [Validators.required]],
    date: [new Date(), [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  accounts: any = []

  headElements = ['Name', 'Balance', 'Action'];

  constructor(
    private fb: FormBuilder,
    private bankService: BankAccountService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts(){
    this.loading = true
    this.bankService.getAccounts().subscribe((data: any) => {
      this.accounts = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.accountCreateModal.hide()
    this.accountEditModal.hide()
    this.accountForm.reset()
    this.submit = false
  }

  create(){
    this.submit = true
    this.bankService.create(this.accountForm.value).subscribe((data: any) => {
      this.getAccounts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(account){
    this.accountForm.get('name').patchValue(account.name)
    this.accountForm.get('start_balance').patchValue(account.start_balance)
    this.accountForm.get('date').patchValue(new Date(account.date))
    this.accountForm.get('id').patchValue(account.id)
    this.accountEditModal.show()
  }

  update(){
    this.submit = true
    this.bankService.edit(this.accountForm.value).subscribe((data: any) => {
      this.getAccounts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Account?', 'Are you sure you want to Delete this account?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.bankService.delete(this.accountForm.value.id).subscribe((data: any) => {
          this.getAccounts()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

}
