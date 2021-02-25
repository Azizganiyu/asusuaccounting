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
import { JournalRecordComponent } from './journal-record/journal-record.component';



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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
