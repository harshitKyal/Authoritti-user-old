import {Component} from '@angular/core';
import {BasePageFinancialGoals} from "../../base/BasePageFinancialGoals";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../../../services/page.service";
import {BackendService} from "../../../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../../../Arrow/services/alert/arrow-alert.service";


@Component({
	selector   : 'app-annual-goal',
	templateUrl: './annual-goal.page.html',
	styleUrls  : ['./annual-goal.page.scss'],
})
export class AnnualGoalPage extends BasePageFinancialGoals
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





	reset()
	{
		super.reset();


		this.backendService.financialGoal.annual_goal = null;
	}
}
