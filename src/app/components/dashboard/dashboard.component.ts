import { Component, OnInit } from '@angular/core';
import { DashBoardDto } from 'src/app/models/dashboard.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: DashBoardDto | undefined

  constructor(private dashService: DashboardService){}

  ngOnInit(): void {
    this.getDashboard()
  }

  private getDashboard() {
    this.dashService.getFullDash().subscribe({
      next: (data) => this.dashboard = data
    })
  }

}
