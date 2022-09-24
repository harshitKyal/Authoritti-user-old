import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../services/page.service";
import {BackendService} from "../../../../services/backend.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowToastService} from "../../../../Arrow/services/toast/arrow-toast.service";
import {VOSession} from "../../../../vo/VOSession";
import { EnumField, } from "../../../../enums/Enums";
import {VOError} from "../../../../vo/VOError";
import {BasePage} from "../../../base/BasePage";
import {VOPage} from "../../../../vo/VOPage";
import {untilDestroyed} from "ngx-take-until-destroy";
import { ReportService } from 'src/app/6FigureExpert/services/report.service';
import { VOProduct } from '../custom/financial-goals/vo/VOProduct';


@Component({
     selector   : 'app-start',
     templateUrl: './start.page.html',
     styleUrls  : ['./start.page.scss'],
})
export class StartPage extends BasePage
{
     public sessions:VOSession[];



     public enumReportType: string = '';
     public html: string = '';
     reportName: string = '';

     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService,
                 public toastService:ArrowToastService,
                 private reportService: ReportService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     ngOnInit()
     {
          this.appName = this.backendService.currentApp.title;


          this.route.data
                  .pipe(untilDestroyed(this))
                  .subscribe((data) => {

                       this.backendService.pages = data[EnumField.APP_INFO][EnumField.PAGES];
                       this.sessions = data[EnumField.APP_INFO][EnumField.SESSIONS];


                       for (let i = 0; i < this.backendService.pages.length; i++)
                       {
                            let itemPage:VOPage = this.backendService.pages[i];


                            if (itemPage.intro && itemPage.intro.show_intro_icon)
                            {
                                 this.backendService.pages.splice(i, 1);

                                 this.backendService.curIntroPage = itemPage;
                                 break;
                            }
                       }


                       this.backendService.pagesCount = 0;
                       for (let itemPage of this.backendService.pages)
                       {
                            if (!itemPage.report)
                            {
                                 this.backendService.pagesCount += 1;
                            }
                       }
                  });
     }





     ngOnDestroy():void
     {
     }





     public newSession():void
     {
          if (!this.backendService.getPages().length)
          {
               this.alertService.show("No data available.", "Warning");
               return;
          }


          // input session name
          this.alertService.showInput(this.backendService.currentApp.title, "Enter a unique name")
                  .then((value:string) => {

                       if (value == null)
                       {
                            return;
                       }


                       if (!value)
                       {
                            this.toastService.showError("Session name is required");
                       }
                       else if (this.isDuplicateSessionName(value))
                       {
                            this.toastService.showError("Session name must be unique.");
                       }
                       else
                       {
                            this.backendService.currentSession = new VOSession();
                            this.backendService.currentSession.title = value;


                            super.startSession();
                       }
                  });
     }





     public resumeSession(session:VOSession):void
     {
          if (!this.backendService.getPages().length)
          {
               this.alertService.show("No data available.", "Warning");
               return;
          }


          this.backendService.currentSession = session;
          super.startSession();
     }


     //for exporting pdf of summery
     public exportSummeryPdf = (item)=>{
          console.log(item);
          const pages = this.backendService.getPages();
          if(pages && pages.length){
               this.page = pages[pages.length -1];
               this.enumReportType = this.page.report.formula.code;
               //this.changeReport(0);

               if (this.enumReportType == this.EnumReport.FINANCIAL_GOALS.code)
               {
                    let values = [];
                    Object.keys(item.answers.products).forEach(f => {
                         values.push(item.answers.products[f]);
                    })

                    //creating VOProduct object for products...
                    for(let [key, product] of Object.entries(item.answers.products)){
                         let productObject = new VOProduct(product);
                         item.answers.products[key] = productObject;
                    }

                    this.backendService.financialGoalReport = [this.calculateReportYearly(item.answers)];
               } else {
                    if(pages && pages.length) {
                         pages.forEach( ele => {
                              if(ele.questionnaire && ele.questionnaire.questions) {
                                   ele.questionnaire.questions.forEach(subele => {
                                        subele.answer = item.answers[subele.answerId] ? item.answers[subele.answerId] : 0;
                                   })
                              }
                         })
                    }
               }
                    this.reportName = this.backendService.currentApp.title + ' Report'
                    this.page.report.items = this.reportService.generateReport(pages, this.page.report);
                    this.loaderService.show();
                    setTimeout(()=>{
                         if (this.enumReportType == this.EnumReport.FINANCIAL_GOALS.code
                              || this.enumReportType == this.EnumReport.SKILLS.code)
                          {
                               this.reportService.printReportLandscape(this.html)
                                       .pipe(untilDestroyed(this))
                
                                       .subscribe((value:string) => {
                                            window.open(value, '_blank');
                                            this.enumReportType = '';
                                            this.html = '';
                                            this.loaderService.hide();
                                       }, error=>{
                                        this.loaderService.hide();
                                       });
                          }
                          else
                          {
                               this.reportService.printReport(this.html)
                                       .pipe(untilDestroyed(this))
                
                                       .subscribe((value:string) => {
                                            window.open(value, '_blank');
                                            this.enumReportType = '';
                                            this.html = '';
                                            this.loaderService.hide();
                                       }, error=>{
                                        this.loaderService.hide();
                                       });
                          }
                    }, 1000)
               }
     }

     //generating yearly report...
     private calculateReportYearly(financialGoal):any
	{
		let date:Date = new Date();
		let yearDays:number = this.dataManager.isLeapYear(date.getFullYear()) ? 366 : 365;


		return {
			key : "Yearly",
			value: this.reportService.calculate(yearDays,financialGoal)
		};
	}



     public removeSession(entityId:string, index:number):void
     {
          this.alertService.confirmDelete((yes) => {

               if (yes)
               {
                    this.loaderService.show()
                            .then(() => this.backendService.deleteSession(entityId))
                            .then(() => this.sessions.splice(index, 1))
                            .catch((error:VOError) => this.alertService.error(error.msg))

                            .finally(() => this.loaderService.hide());
               }
          });
     }





     public isDuplicateSessionName(name:string):boolean
     {
          for (let itemSession of this.sessions)
          {
               if (itemSession.title.toLowerCase() == name.toLowerCase())
               {
                    return true;
               }
          }


          return false;
     }
}
