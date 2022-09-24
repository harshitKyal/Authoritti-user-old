import {BasePageCustom} from "../../../../../base/BasePageCustom";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../../services/page.service";
import {BackendService} from "../../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../../Arrow/services/alert/arrow-alert.service";
import {VOFinancialGoal} from "../vo/VOFinancialGoal";


export class BasePageFinancialGoals extends BasePageCustom
{
	public financialGoal:VOFinancialGoal;





	constructor(route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  pageService:PageService,
			  backendService:BackendService,
			  loaderService:ArrowLoaderService,
			  alertService:ArrowAlertService)
	{
		super(route, navController, pageService, backendService, loaderService, alertService);
	}





	ngOnInit():void
	{
		super.ngOnInit();


		this.financialGoal = this.backendService.financialGoal;
	}
}
