import {Component} from '@angular/core';
import {BasePageFinancialGoals} from "../../base/BasePageFinancialGoals";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../../../services/page.service";
import {BackendService} from "../../../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../../../Arrow/services/alert/arrow-alert.service";


@Component({
     selector   : 'app-tasks',
     templateUrl: './tasks.page.html',
     styleUrls  : ['./tasks.page.scss'],
})
export class TasksPage extends BasePageFinancialGoals
{
     public tasks:any[] = [
          {id: "1", name: "Linkedin Organic Content"},
          {id: "2", name: "Google Adwords"},
          {id: "3", name: "Networking"},
          {id: "4", name: "Facebook Organic Content"},
          {id: "5", name: "SEO"},
          {id: "6", name: "Referral Partner Program"},
          {id: "7", name: "YouTube Organic Content"},
          {id: "8", name: "Linkedin Advertising"},
          {id: "9", name: "Email Marketing"},
          {id: "10", name: "Instagram Organic Content"},
          {id: "11", name: "Facebook Advertising"},
          {id: "12", name: "Keynote speaking"},
          {id: "13", name: "Twitter Organic Content"},
          {id: "14", name: "Instagram Advertising"},
          {id: "15", name: "Blogging"},
          {id: "16", name: "TikTok Organic Content"},
          {id: "17", name: "Twitter Advertising"},
          {id: "18", name: "Guest Writer – Magazine"},
          {id: "19", name: "Other"},
          {id: "20", name: "Industry Journals"},
          {id: "21", name: "Other"},
          {id: "", name: ""},
          {id: "22", name: "TV"},
          {id: "", name: ""},
          {id: "", name: ""},
          {id: "23", name: "Other"},
          {id: "", name: ""},
     ];





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     reset()
     {
          super.reset();


          this.financialGoal.tasks = {};
     }





     public onChange(detail:any):void
     {
          this.financialGoal.tasks[detail.value] = detail.checked;
     }
}
