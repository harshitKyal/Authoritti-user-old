import {Component} from '@angular/core';
import {BasePageFinancialGoals} from "../../base/BasePageFinancialGoals";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../../../services/page.service";
import {BackendService} from "../../../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../../../Arrow/services/alert/arrow-alert.service";


@Component({
	selector   : 'app-average-sale-required',
	templateUrl: './average-sale-required.page.html',
	styleUrls  : ['./average-sale-required.page.scss'],
})
export class AverageSaleRequiredPage extends BasePageFinancialGoals
{
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
