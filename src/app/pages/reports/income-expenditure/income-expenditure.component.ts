import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-income-expenditure',
  templateUrl: './income-expenditure.component.html',
  styleUrls: ['./income-expenditure.component.scss']
})
export class IncomeExpenditureComponent implements OnInit {

  durationForm  = this.fb.group({
    from: [null, [Validators.required]],
    to: [new Date(), [Validators.required]],
  });

  showResult : boolean = false
  assets: any = []
  liabilities: any = []
  expenses: any = []
  income: any = []
  equity: any = []

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
        equity: 'Capital Accounts',
        value: this.data.equity.capital_account.balance
      },
    ]
  }

  setLiabilities(){
    this.liabilities = [
      {
        liabilities: 'Account Payable',
        value: this.data.liabilities.account_payable.balance
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
    ]
  }

  absolute(value){
    return Math.abs(value)
  }

  eval(val){
    if(val < 0){
      return "("+Math.abs(val).toLocaleString()+")"
    }
    else{
      return val.toLocaleString()
    }
  }

  getDurationDate(date){
    return new Date(date).toLocaleDateString()
  }
}
