import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-account-charts',
  templateUrl: './account-charts.component.html',
  styleUrls: ['./account-charts.component.scss']
})
export class AccountChartsComponent implements OnInit {

  @ViewChild('accountCreateModal', { static: true }) accountCreateModal;
  @ViewChild('accountEditModal', { static: true }) accountEditModal;
  @ViewChild('accountSubCreateModal', { static: true }) accountSubCreateModal;
  @ViewChild('accountSubEditModal', { static: true }) accountSubEditModal;

  accountForm = this.fb.group({
    name: ['', [Validators.required]],
    sub_id: [null, [Validators.required]],
    id: [''],
  })

  accountSubForm = this.fb.group({
    name: ['', [Validators.required]],
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  accounts: any = []
  @Input() id;

  headElements = ['Name', 'Action',];

  constructor(
    private coa: ChartOfAccountService,
    private fb: FormBuilder,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts(){
    this.loading = true
    this.coa.getAccounts(this.id).subscribe((data: any) => {
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
    this.accountSubCreateModal.hide()
    this.accountSubEditModal.hide()
    this.accountForm.reset()
    this.accountSubForm.reset()
    this.submit = false
  }

  groupCreate(){
    this.submit = true
    this.coa.createGroup(this.accountSubForm.value, this.id).subscribe((data: any) => {
      this.getAccounts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  groupEdit(group){
    this.accountSubForm.get('name').patchValue(group.name)
    this.accountSubForm.get('id').patchValue(group.id)
    this.accountSubEditModal.show()
  }

  groupUpdate(){
    this.submit = true
    this.coa.editGroup(this.accountSubForm.value).subscribe((data: any) => {
      this.getAccounts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmGroupDelete(){
    let dialogRef = this.helper.confirm('Delete Group?', 'Are you sure you want to Delete this group?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.coa.deleteGroup(this.accountSubForm.value.id).subscribe((data: any) => {
          this.getAccounts()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  create(){
    this.submit = true
    this.coa.create(this.accountForm.value, this.id).subscribe((data: any) => {
      this.getAccounts()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(account){
    this.accountForm.get('name').patchValue(account.name)
    this.accountForm.get('sub_id').patchValue(account.sub_id)
    this.accountForm.get('id').patchValue(account.id)
    this.accountEditModal.show()
  }

  update(){
    this.submit = true
    this.coa.edit(this.accountForm.value).subscribe((data: any) => {
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
        this.coa.delete(this.accountForm.value.id).subscribe((data: any) => {
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
