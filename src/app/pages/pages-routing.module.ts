import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { CashAccountsComponent } from './cash-accounts/cash-accounts.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InterAccountTransferComponent } from './inter-account-transfer/inter-account-transfer.component';
import { InventoryItemsComponent } from './inventory-items/inventory-items.component';
import { PaymentsComponent } from './payments/payments.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { InterAccountRecordComponent } from './regords/inter-account-record/inter-account-record.component';
import { PurchaseInvoiceRecordComponent } from './regords/purchase-invoice-record/purchase-invoice-record.component';
import { PaymentRecordComponent } from './regords/payment-record/payment-record.component';
import { BusinessLogoComponent } from './settings/business-logo/business-logo.component';
import { ChartOfAccountsComponent } from './settings/chart-of-accounts/chart-of-accounts.component';
import { SettingsComponent } from './settings/settings.component';
import { StartDateComponent } from './settings/start-date/start-date.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { SaleInvoiceRecordComponent } from './regords/sale-invoice-record/sale-invoice-record.component';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { ReceiptRecordComponent } from './regords/receipt-record/receipt-record.component';
import { JournalEntryRecordComponent } from './regords/journal-entry-record/journal-entry-record.component';
import { JournalRecordComponent } from './journal-record/journal-record.component';
import { CapitalAccountComponent } from './capital-account/capital-account.component';
import { FixedAssetComponent } from './fixed-asset/fixed-asset.component';
import { FixedAssetDepreciationComponent } from './fixed-asset-depreciation/fixed-asset-depreciation.component';
import { IntangibleAssetComponent } from './intangible-asset/intangible-asset.component';
import { IntangibleAssetAmortizationComponent } from './intangible-asset-amortization/intangible-asset-amortization.component';
import { DepreciationRecordComponent } from './regords/depreciation-record/depreciation-record.component';
import { AmortizationRecordComponent } from './regords/amortization-record/amortization-record.component';
import { ReportsComponent } from './reports/reports.component';
import { BalanceSheetComponent } from './reports/balance-sheet/balance-sheet.component';
import { IncomeExpenditureComponent } from './reports/income-expenditure/income-expenditure.component';
import { LedgerComponent } from './reports/ledger/ledger.component';
import { PrimaryAccountComponent } from './settings/primary-account/primary-account.component';
import { BankReconcilationComponent } from './bank-reconcilation/bank-reconcilation.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/start-date',
    component: StartDateComponent,
  },
  {
    path: 'settings/primary-account',
    component: PrimaryAccountComponent,
  },
  {
    path: 'settings/business-logo',
    component: BusinessLogoComponent,
  },
  {
    path: 'settings/chart-of-accounts',
    component: ChartOfAccountsComponent,
  },
  {
    path: 'bank-accounts',
    component: BankAccountsComponent,
  },
  {
    path: 'cash-accounts',
    component: CashAccountsComponent,
  },
  {
    path: 'inter-account-transfers',
    component: InterAccountTransferComponent,
  },
  {
    path: 'inter-account-record',
    component: InterAccountRecordComponent,
  },
  {
    path: 'purchase-invoice-record',
    component: PurchaseInvoiceRecordComponent,
  },
  {
    path: 'sale-invoice-record',
    component: SaleInvoiceRecordComponent,
  },
  {
    path: 'payment-record',
    component: PaymentRecordComponent,
  },
  {
    path: 'receipt-record',
    component: ReceiptRecordComponent,
  },
  {
    path: 'journal-record',
    component: JournalEntryRecordComponent,
  },
  {
    path: 'depreciation-record',
    component: DepreciationRecordComponent,
  },
  {
    path: 'amortization-record',
    component: AmortizationRecordComponent,
  },
  {
    path: 'inventory-items',
    component: InventoryItemsComponent,
  },
  {
    path: 'customers',
    component: CustomerComponent,
  },
  {
    path: 'suppliers',
    component: SupplierComponent,
  },
  {
    path: 'purchase-invoice',
    component: PurchaseInvoiceComponent,
  },
  {
    path: 'sale-invoice',
    component: SaleInvoiceComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'receipts',
    component: ReceiptsComponent,
  },
  {
    path: 'journal',
    component: JournalRecordComponent,
  },
  {
    path: 'capital-account',
    component: CapitalAccountComponent,
  },
  {
    path: 'fixed-asset',
    component: FixedAssetComponent,
  },
  {
    path: 'fixed-asset-depreciation',
    component: FixedAssetDepreciationComponent,
  },
  {
    path: 'intangible-asset',
    component: IntangibleAssetComponent,
  },
  {
    path: 'intangible-asset-amortization',
    component: IntangibleAssetAmortizationComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'balance-sheet',
    component: BalanceSheetComponent,
  },
  {
    path: 'income-expenditure',
    component: IncomeExpenditureComponent,
  },
  {
    path: 'ledger',
    component: LedgerComponent,
  },
  {
    path: 'bank-reconcilation',
    component: BankReconcilationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
