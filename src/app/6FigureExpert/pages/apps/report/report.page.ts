import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArrowNavigationService} from '../../../../Arrow/services/navigation/arrow-navigation.service';
import {PageService} from '../../../services/page.service';
import {BackendService} from '../../../../services/backend.service';
import {ReportService} from '../../../services/report.service';
import {ArrowLoaderService} from '../../../../Arrow/services/loader/arrow-loader.service';
import {ArrowAlertService} from '../../../../Arrow/services/alert/arrow-alert.service';
import {BasePageDynamic} from '../../../base/BasePageDynamic';
import {EnumReport} from '../../../../enums/Enums';
import {untilDestroyed} from "ngx-take-until-destroy";


@Component({
     selector   : 'app-report',
     templateUrl: './report.page.html',
     styleUrls  : ['./report.page.scss'],
})
export class ReportPage extends BasePageDynamic
{
     public html:string;
     public reportName:string;





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService,
                 public reportService:ReportService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     ngOnInit()
     {
          super.ngOnInit();


          this.reportName = this.appName + " Report";
     }





     public printReport():void
     {
          if (this.page.report.formula.code == EnumReport.FINANCIAL_GOALS.code
              || this.page.report.formula.code == EnumReport.SKILLS.code)
          {
               this.reportService.printReportLandscape(this.html)
                       .pipe(untilDestroyed(this))

                       .subscribe((value:string) => {
                            window.open(value, '_blank');
                       });
          }
          else
          {
               this.reportService.printReport(this.html)
                       .pipe(untilDestroyed(this))

                       .subscribe((value:string) => {
                            window.open(value, '_blank');
                       });
          }
     }
}
