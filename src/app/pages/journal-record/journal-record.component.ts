import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { JournalService } from 'src/app/services/journal/journal.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ChartOfAccountService } from 'src/app/services/chart-of-account/chart-of-account.service';

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
    transactions: this.fb.array([
      this.fb.group({
          account: ['', [Validators.required]],
          description:  [''],
          debit:  [0],
          credit:  [0],
      }),
      this.fb.group({
          account: ['', [Validators.required]],
          description:  [''],
          debit:  [0],
          credit:  [0],
      })
    ]),
    id: [''],
  })

  submit: boolean = false

  loading: boolean = true
  journals: any = []
  accounts: any = []

  debit: number = 0;
  credit: number = 0
  headElements = ['Name', 'Email', 'Invoices', 'Accounts receivable', 'Action'];

   constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private helper: HelperService,
    private coa: ChartOfAccountService,
  ) {
    this.generateReferenceNumber()
    this.getCoas()
    //this.getJournals()
  }

  get transactions() {
    return this.journalForm.get('transactions') as FormArray;
  }

  addtransaction() {
    const control = this.fb.group({
      account: ['', [Validators.required]],
      description:  [''],
      debit:  [0],
      credit:  [0],
    });
    this.transactions.push(control);
  }

  removeTransaction(index: number) {
    this.transactions.removeAt(index);
  }

  ngOnInit(): void {
    this.journalForm.get('transactions').valueChanges.subscribe((val) => {
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
        this.accounts = data.data
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
    this.journalForm.get('name').patchValue(journal.name)
    this.journalForm.get('email').patchValue(journal.email)
    this.journalForm.get('identifier').patchValue(journal.identifier)
    this.journalForm.get('start_balance').patchValue(journal.start_balance)
    this.journalForm.get('id').patchValue(journal.id)
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
    this.journalForm.get('date').patchValue(new Date())
  }


}
