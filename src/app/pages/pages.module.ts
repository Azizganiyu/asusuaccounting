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
  JournalRecordComponent
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
