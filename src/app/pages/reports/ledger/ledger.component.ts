import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  durationForm  = this.fb.group({
    to: [new Date(), [Validators.required]],
    from: [null],
  });

  showResult : boolean = false
  assets: any = []
  liabilities: any = []
  expenses: any = []
  income: any = []
  equity: any = []

  totalCredit: number = 0
  totalDebit: number = 0

  submit: boolean = false

  data : any

  constructor(
    private report: ReportService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  generateData(){
    this.showResult = false
    this.submit = true
    this.report.generateDashboardData(this.durationForm.value).subscribe((data : any) => {
      console.log(data)
      this.data = data
      this.setAssets()
      this.setLiabilities()
      this.setExpenses()
      this.setIncome()
      this.setEquity()
      this.setTotalCreditDebit()
      this.submit = false
      this.showResult = true
    }, ((error) => {
      console.log(error)
    }))
  }

  setAssets(){
    this.assets = [
      {
        assets: 'Cash at bank',
        value: this.data.assets.cash_at_bank.balance
      },
      {
        assets: 'Cash at hand',
        value: this.data.assets.cash_at_hand.balance
      },
      {
        assets: 'Account receivable',
        value: this.data.assets.account_receivable.balance
      },
      {
        assets: 'Loan receivable',
        value: this.data.assets.loan_receivable
      },
      {
        assets: 'Loan interest receivable',
        value: this.data.assets.loan_interest_receivable
      },
      {
        assets: 'Inventory on hand',
        value: this.data.assets.inventory_on_hand.balance
      },
      {
        assets: 'Fixed assets, accumulated depreciation',
        value: this.data.assets.fixed_asset.depreciation
      },
      {
        assets: 'Fixed assets, at cost',
        value: this.data.assets.fixed_asset.cost
      },
      {
        assets: 'Intangible assets, accumulated amortization',
        value: this.data.assets.intangible_asset.amortization
      },
      {
        assets: 'Intangible assets, at cost',
        value: this.data.assets.intangible_asset.cost
      },
    ]
  }

  setEquity(){
    this.equity = [
      {
        equity: 'Retained earnings',
        value: this.data.equity.retained_earnings
      },
      {
        equity: 'Capital accounts',
        value: this.data.equity.capital_account.balance
      },
      {
        equity: 'Member investments',
        value: this.data.equity.member_investments
      },
    ]
  }

  setLiabilities(){
    this.liabilities = [
      {
        liabilities: 'Account payable',
        value: this.data.liabilities.account_payable.balance
      },
      {
        liabilities: 'Member contributions',
        value: this.data.liabilities.member_contributions
      },
    ]
  }

  setExpenses(){
    this.expenses = [
      {
        expenses: 'Fixed assets - depreciation',
        value: this.data.expenses.fixed_asset.total
      },
      {
        expenses: 'Intangible assets - amortization',
        value: this.data.expenses.intangible_asset.total
      },
      {
        expenses: 'Inventory - cost',
        value: this.data.expenses.inventory_costs.total
      },
    ]
  }

  setIncome(){
    this.income = [
      {
        income: 'Inventory - sales',
        value: this.data.income.inventory_sales.total
      },
      {
        income: 'Interest - loans',
        value: this.data.income.interest_from_loans
      },
    ]
  }

  absolute(value){
    return Math.abs(value)
  }

  eval(val){
    if(val < 0){
      return Math.abs(val).toLocaleString()
    }
    else if(val > 0){
      return val.toLocaleString()
    }
    else{
      return this.absolute(val)
    }
  }

  getDurationDate(date){
    return new Date(date).toLocaleDateString()
  }

  setTotalCreditDebit(){
    this.assets.forEach(element => {
      if(element.value > 0){
        this.totalDebit+= Math.abs(element.value)
      }
      else{
        this.totalCredit+= Math.abs(element.value)
      }
    });

    this.data.assets.accounts.accounts.forEach(element => {
      if(element.balance > 0){
        this.totalDebit+= Math.abs(element.balance)
      }
      else{
        this.totalCredit+= Math.abs(element.balance)
      }
    });


    this.liabilities.forEach(element => {
      if(element.value < 0){
        this.totalDebit+= Math.abs(element.value)
      }
      else{
        this.totalCredit+= Math.abs(element.value)
      }
    });

    this.data.liabilities.accounts.accounts.forEach(element => {
      if(element.balance < 0){
        this.totalDebit+= Math.abs(element.balance)
      }
      else{
        this.totalCredit+= Math.abs(element.balance)
      }
    });

    this.equity.forEach(element => {
      if(element.value < 0){
        this.totalDebit+= Math.abs(element.value)
      }
      else{
        this.totalCredit+= Math.abs(element.value)
      }
    });

    this.data.equity.accounts.accounts.forEach(element => {
      if(element.balance < 0){
        this.totalDebit+= Math.abs(element.balance)
      }
      else{
        this.totalCredit+= Math.abs(element.balance)
      }
    });

    console.log(this.totalDebit, this.totalCredit)

  }

}
