import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../../../services/backend.service";


@Component({
     selector   : 'comp-report-header',
     templateUrl: './header-report.component.html',
     styleUrls  : ['./header-report.component.scss'],
})
export class HeaderReportComponent implements OnInit
{
     public logo:string;
     public logoWhite:string;
     public date:string;





     constructor(public backendService:BackendService)
     {
     }





     ngOnInit()
     {
          this.logo = "assets/images/report.png";
          this.logoWhite = "assets/images/report-white.png";


          let d = new Date();
          this.date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
     }
}
