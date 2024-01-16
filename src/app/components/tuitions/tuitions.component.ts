import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TuitionService } from 'src/app/services/tuition.service';
import { Tuition } from 'src/app/models/tuition.model';

@Component({
  selector: 'app-tuitions',
  templateUrl: './tuitions.component.html',
  styleUrls: ['./tuitions.component.css']
})
export class TuitionsComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  pageEvent: PageEvent;
  
  displayedColumns: string[] = ['studentNumber','transactionDate', 'amount', 'referenceMonth', 'actions'];
  
  dataSource = new MatTableDataSource<Tuition>([]);  
  pageIndex = 0
  pageSize = 5
  length:number

  constructor(private tuitionService: TuitionService){}


  ngOnInit(): void {
    this.getTuitions()   
  }

  getTuitions() {    
    this.tuitionService.getTuitions(this.pageIndex, this.pageSize).subscribe(
      data => {
        this.length = data.totalElements      
        this.dataSource.data = data.content
      })
  }

  pageChangeEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getTuitions();
}

}
