import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { ExcelExportService } from 'src/app/services/excel-export/excel-export.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-receipt-record',
  templateUrl: './receipt-record.component.html',
  styleUrls: ['./receipt-record.component.scss']
})
export class ReceiptRecordComponent implements OnInit {

  data: any

  constructor(
    private dataStorage: DataStorageService,
    private router: Router,
    private helper: HelperService,
    private excelService: ExcelExportService
    ) {
    if(this.dataStorage.reportData){
      this.data = this.dataStorage.reportData
    }
    else{
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
  }

  get logo(){
    return this.helper.getLogo()
  }

  export(){
    this.excelService.exportAsExcel(
      {
        data: this.data.export,
        fileName: this.data.title,
        header: this.data.headElements
      }
    )
  }

}
