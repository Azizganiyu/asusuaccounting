import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { ExcelExportService } from 'src/app/services/excel-export/excel-export.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-journal-entry-record',
  templateUrl: './journal-entry-record.component.html',
  styleUrls: ['./journal-entry-record.component.scss']
})
export class JournalEntryRecordComponent implements OnInit {

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
        data: this.data.entry,
        fileName: this.data.title,
      }
    )
  }

}
