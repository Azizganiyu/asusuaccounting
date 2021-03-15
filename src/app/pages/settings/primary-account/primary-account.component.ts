import { Component, OnInit } from '@angular/core';
import { AccountTransferService } from 'src/app/services/account-transfer/account-transfer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { PrimaryAccountService } from 'src/app/services/primary-account/primary-account.service';

@Component({
  selector: 'app-primary-account',
  templateUrl: './primary-account.component.html',
  styleUrls: ['./primary-account.component.scss']
})
export class PrimaryAccountComponent implements OnInit {

  primaryAccountForm = this.fb.group({
    account: [null, [Validators.required]],
    type: [null, [Validators.required]],
    account_id: [null, [Validators.required]],
  })

  accounts: any = []
  loading: boolean = true
  submit: boolean = false

  constructor(
    private transferService: AccountTransferService,
    private fb: FormBuilder,
    public helper: HelperService,
    private primaryAccountService: PrimaryAccountService,
  ) {
    this.getAccounts()
   }

  ngOnInit(): void {
    this.primaryAccountForm.get('account').valueChanges.subscribe((val) => {
      if(val != null){
        this.primaryAccountForm.patchValue({
          'type': val.type,
          'account_id': val.id,
        })
      }
      else{
        this.primaryAccountForm.patchValue({
          'type': '',
          'account_id': '',
        })
      }
    })
  }

  setPrimaryAccount(data){
    let account = this.accounts.filter((val) => {
      return val.id == data.account_id && val.type == data.type
    })[0]
    this.primaryAccountForm.get('account').patchValue(account)
    this.primaryAccountForm.get('type').patchValue(data.type)
    this.primaryAccountForm.get('account_id').patchValue(data.account_id)
  }

  getAccounts(){
    this.transferService.getMergedAccounts().subscribe((data: any) => {
      this.accounts = data.data
      this.getPrimaryAccount()
    }, (error => {
      console.log(error)
    }))
  }

  onSubmit(){
    console.log(this.primaryAccountForm.value)
    this.submit = true
    this.primaryAccountService.set(this.primaryAccountForm.value).subscribe((data: any) => {
      this.submit = false
      this.helper.showSuccess(data.message, 'Success!')
    }, (error => {
      this.submit = false
      console.log(error)
    }))
  }

  getPrimaryAccount(){
    this.primaryAccountService.get().subscribe((data: any) => {
      if(data.data){
        this.setPrimaryAccount(data.data)
      }
      this.loading = false
     console.log(data)
    }, (error => {
      this.loading = false
      console.log(error)
    }))
  }

}
