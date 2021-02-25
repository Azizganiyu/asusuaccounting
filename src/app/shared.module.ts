import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

//Material
import { MaterialModule } from './material/material.module';
import { ToastrModule } from "ngx-toastr";
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AmountPipe } from './pipes/amount/amount.pipe';

import {NgxPrintModule} from 'ngx-print';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        MDBBootstrapModule.forRoot(),
        ToastrModule.forRoot(),
        NgxPrintModule
     ],
    declarations: [
      ConfirmComponent,
      LoadingComponent,
      AmountPipe,
    ],
    exports: [
        MaterialModule,
        MDBBootstrapModule,
        ToastrModule,
        LoadingComponent,
        ConfirmComponent,
        NgxPrintModule,
        AmountPipe,
    ]
})
export class SharedModule {}
