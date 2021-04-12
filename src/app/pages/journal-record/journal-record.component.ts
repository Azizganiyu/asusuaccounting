import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { JournalService } from 'src/app/services/journal/journal.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Router } from '@angular/router';
import { AccountTransferService } from 'src/app/services/account-transfer/account-transfer.service';

@Component({
  selector: 'app-journal-record',
  templateUrl: './journal-record.component.html',
  styleUrls: ['./journal-record.component.scss']
})
export class JournalRecordComponent implements OnInit {

  @ViewChild('journalCreateModal', { static: true }) journalCreateModal;
  @ViewChild('journalEditModal', { static: true }) journalEditModal;

  journalForm = this.fb.group({
    date: [new Date(), [Validators.required]],
    journal_reference: [{value: '', disabled: true}, [Validators.required]],
    narration: [''],
    entries: this.fb.array([]),
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  journals: any = []
  accounts: any = []
  coas: any = []

  debit: number = 0;
  credit: number = 0
  headElements = ['Date', 'Reference', 'Narration', 'Debit', 'Credit', 'status', 'Action'];

   constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private helper: HelperService,
    private coa: ChartOfAccountService,
    private dataService: DataStorageService,
    private router: Router,
    private transferService: AccountTransferService
  ) {
    this.generateReferenceNumber()
    this.getCoas()
    this.getAccounts()
    this.getJournals()
  }

  get entries() {
    return this.journalForm.get('entries') as FormArray;
  }

  new(){
    this.addEntry()
    this.addEntry()
    this.journalCreateModal.show()
  }

  addEntry() {
    const control = this.fb.group({
      account: ['', [Validators.required]],
      accountType: ['coa', [Validators.required]],
      description:  [''],
      debit:  [0],
      credit:  [0],
    });
    this.entries.push(control);
  }

  getAccounts(){
    this.transferService.getMergedAccounts().subscribe((data: any) => {
      this.accounts = data.data
    }, (error => {
      console.log(error)
    }))
  }

  removeEntry(index: number) {
    this.entries.removeAt(index);
  }

  ngOnInit(): void {
    this.journalForm.get('entries').valueChanges.subscribe((val) => {
      console.log(val)
      this.getTotal(val)
    })
  }

  getTotal(val){
    this.debit = 0
    this.credit = 0
    val.forEach(element => {
      this.debit += element.debit
      this.credit += element.credit
    });
  }

  generateReferenceNumber(){
    let number1 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number2 = Math.random().toString(36).substring(2, 2) + Math.random().toString(36).substring(2, 8)
    let number ='ref_'+number1+'_'+number2
    this.journalForm.get('journal_reference').patchValue(number)
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

  getJournals(){
    this.loading = true
    this.journalService.getJournals().subscribe((data: any) => {
      console.log(data)
      this.journals = data.data
      this.loading = false
    }, (error => {
      console.log(error)
      this.loading = false
    }))
  }

  hideModal(){
    this.journalCreateModal.hide()
    this.journalEditModal.hide()
    this.resetForm()
    this.submit = false
  }

  create(){
    console.log('submitted')
    console.log(this.journalForm.getRawValue())
    this.submit = true
    console.log(this.journalForm.value)
    this.journalService.create(this.journalForm.getRawValue()).subscribe((data: any) => {
      this.getJournals()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  edit(journal){
    this.journalForm.get('narration').patchValue(journal.narration)
    this.journalForm.get('journal_reference').patchValue(journal.journal_reference)
    this.journalForm.get('id').patchValue(journal.id)
    this.journalForm.get('date').patchValue(new Date(journal.date))
    JSON.parse(journal.entries).forEach(element => {
      const control = this.fb.group({
        account: [element.account, [Validators.required]],
        accountType: [element.accountType? element.accountType: 'coa', [Validators.required]],
        description:  [element.description],
        debit:  [element.debit],
        credit:  [element.credit],
      });
      this.entries.push(control);
    });
    this.journalEditModal.show()
  }

  update(){
    this.submit = true
    this.journalService.edit(this.journalForm.getRawValue()).subscribe((data: any) => {
      this.getJournals()
      this.helper.showSuccess(data.message, 'Success!')
      this.hideModal()
    }, (error => {
      console.log(error)
    }))
  }

  confirmDelete(){
    let dialogRef = this.helper.confirm('Delete Journal?', 'Are you sure you want to Delete this journal?');

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.journalService.delete(this.journalForm.value.id).subscribe((data: any) => {
          this.getJournals()
          this.helper.showSuccess(data.message, 'Success!')
          this.hideModal()
        }, (error => {
          console.log(error)
        }))
      }
    });
  }

  resetForm(){
    this.journalForm.reset()
    this.generateReferenceNumber()
    this.entries.clear()
    this.journalForm.get('date').patchValue(new Date())
  }

  view(el){
    let data = {
      headElements : ['Account', 'Description', 'Debit', 'Credit'],
      title: 'Journal Entry',
      balanced: el.balanced,
      debit: el.debit,
      narration: el.narration,
      credit: el.credit,
      subtitle: el.description,
      date: this.helper.formatDate(el.date),
      reference: el.journal_reference,
      entry: JSON.parse(el.entries).map((entry) => {
        if(entry.accountType && entry.accountType == 'coa'){
          entry.account = el.coa_transactions.filter((item) => {
            return item.account_id == entry.account
          })[0].account.name
        }
        else if(entry.accountType && entry.accountType == 'bank'){
          entry.account = el.bank_transactions.filter((item) => {
            return item.account_id == entry.account
          })[0].account.name
        }
        else if(entry.accountType && entry.accountType == 'cash'){
          entry.account = el.cash_transactions.filter((item) => {
            return item.account_id == entry.account
          })[0].account.name
        }
        return entry
      }),
    }

    this.dataService.reportData = data
    this.router.navigate(['journal-record'])
  }

  setType(i, type){
    this.entries.controls[i].get('accountType').patchValue(type)
  }
}
