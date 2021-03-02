import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { StartDateComponent } from './settings/start-date/start-date.component';
import { BusinessLogoComponent } from './settings/business-logo/business-logo.component';
import { ChartOfAccountsComponent } from './settings/chart-of-accounts/chart-of-accounts.component';
import { AccountChartsComponent } from './settings/chart-of-accounts/account-charts/account-charts.component';
import { CashAccountsComponent } from './cash-accounts/cash-accounts.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { InterAccountTransferComponent } from './inter-account-transfer/inter-account-transfer.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CustomerComponent } from './customer/customer.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { InterAccountRecordComponent } from './regords/inter-account-record/inter-account-record.component';
import { PurchaseInvoiceRecordComponent } from './regords/purchase-invoice-record/purchase-invoice-record.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentRecordComponent } from './regords/payment-record/payment-record.component';
import { SaleInvoiceRecordComponent } from './regords/sale-invoice-record/sale-invoice-record.component';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { ReceiptRecordComponent } from './regords/receipt-record/receipt-record.component';
import { JournalRecordComponent } from './journal-record/journal-record.component';
import { JournalEntryRecordComponent } from './regords/journal-entry-record/journal-entry-record.component';
import { CapitalAccountComponent } from './capital-account/capital-account.component';
import { IntangibleAssetComponent } from './intangible-asset/intangible-asset.component';
import { IntangibleAssetAmortizationComponent } from './intangible-asset-amortization/intangible-asset-amortization.component';
import { FixedAssetComponent } from './fixed-asset/fixed-asset.component';
import { FixedAssetDepreciationComponent } from './fixed-asset-depreciation/fixed-asset-depreciation.component';
import { DepreciationRecordComponent } from './regords/depreciation-record/depreciation-record.component';
import { AmortizationRecordComponent } from './regords/amortization-record/amortization-record.component';
import { ReportsComponent } from './reports/reports.component';
import { BalanceSheetComponent } from './reports/balance-sheet/balance-sheet.component';
import { IncomeExpenditureComponent } from './reports/income-expenditure/income-expenditure.component';
import { LedgerComponent } from './reports/ledger/ledger.component';

@NgModule({
  declarations: [
  DashboardComponent,
  SettingsComponent,
  StartDateComponent,
  BusinessLogoComponent,
  ChartOfAccountsComponent,
  AccountChartsComponent,
  CashAccountsComponent,
  BankAccountsComponent,
  InterAccountTransferComponent,
  ViewReportComponent,
  InventoryItemsComponent,
  SupplierComponent,
  CustomerComponent,
  PurchaseInvoiceComponent,
  InterAccountRecordComponent,
  PurchaseInvoiceRecordComponent,
  PaymentsComponent,
  PaymentRecordComponent,
  SaleInvoiceRecordComponent,
  SaleInvoiceComponent,
  ReceiptsComponent,
  ReceiptRecordComponent,
  JournalRecordComponent,
  JournalEntryRecordComponent,
  CapitalAccountComponent,
  IntangibleAssetComponent,
  IntangibleAssetAmortizationComponent,
  FixedAssetComponent,
  FixedAssetDepreciationComponent,
  DepreciationRecordComponent,
  AmortizationRecordComponent,
  ReportsComponent,
  BalanceSheetComponent,
  IncomeExpenditureComponent,
  LedgerComponent
],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
