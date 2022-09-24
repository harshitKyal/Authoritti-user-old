import {Component} from '@angular/core';
import {BasePageFinancialGoals} from "../../base/BasePageFinancialGoals";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../../../services/page.service";
import {BackendService} from "../../../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../../../Arrow/services/alert/arrow-alert.service";


@Component({
	selector   : 'app-sale-conversion',
	templateUrl: './sale-conversion.page.html',
	styleUrls  : ['./sale-conversion.page.scss'],
})
export class SaleConversionPage extends BasePageFinancialGoals
{
	public disable:boolean = true;





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


		this.checkAllInputs();
	}





	reset()
	{
		super.reset();


		Object.keys(this.financialGoal.products)
			   .forEach((key) => this.financialGoal.products[key].closeRate = null);


		this.disable = true;
	}





	public checkAllInputs():void
	{
		for (let item of Object.values(this.financialGoal.products))
		{
			if (!item['closeRate'])
			{
				this.disable = true;
				return;
			}
		}


		this.disable = false;
	}
}
