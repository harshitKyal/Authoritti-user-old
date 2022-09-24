import {Component} from '@angular/core';
import {BasePageDynamic} from "../../../base/BasePageDynamic";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../services/page.service";
import {BackendService} from "../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";


@Component({
     selector   : 'app-section',
     templateUrl: './section.page.html',
     styleUrls  : ['./section.page.scss'],
})
export class SectionPage extends BasePageDynamic
{
     public white:string = 'assets/images/report-white.png';
     public black:string = 'assets/images/report.png';





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }
}
