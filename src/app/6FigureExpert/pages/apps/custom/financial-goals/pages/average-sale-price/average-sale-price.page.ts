import {Component} from '@angular/core';
import {BasePageFinancialGoals} from "../../base/BasePageFinancialGoals";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../../../services/page.service";
import {BackendService} from "../../../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../../../Arrow/services/alert/arrow-alert.service";
import {VOProduct} from "../../vo/VOProduct";
import {UUID} from "angular2-uuid";


@Component({
	selector   : 'app-average-sale-price',
	templateUrl: './average-sale-price.page.html',
	styleUrls  : ['./average-sale-price.page.scss'],
})
export class AverageSalePricePage extends BasePageFinancialGoals
{
	public inputName:string;
	public inputDollarValue:string;
	public inputSaleValue:string;

	public editId:string = null;





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


		this.inputName = null;
		this.inputDollarValue = null;
		this.inputSaleValue = null;


		this.editId = null;
	}





	public addProduct():void
	{
		let name:string = this.inputName && this.inputName.trim();
		let dollarValue:number = +this.inputDollarValue;
		let saleValue:number = +this.inputSaleValue;


		if (!name || !dollarValue || !saleValue)
		{
			return;
		}


		if (this.editId != null)
		{
			this.financialGoal.products[this.editId].name = name;
			this.financialGoal.products[this.editId].dollarValue = dollarValue;
			this.financialGoal.products[this.editId].saleValue = saleValue;


			this.editId = null;
		}
		else
		{
			this.financialGoal.products[UUID.UUID()] = new VOProduct({
				name       : name,
				dollarValue: dollarValue,
				saleValue  : saleValue
			});
		}


		this.reset();
	}





	public editProduct(id:string, product:VOProduct):void
	{
		this.inputName = product.name;
		this.inputDollarValue = product.dollarValue.toString();
		this.inputSaleValue = product.saleValue.toString();


		this.editId = id;
	}





	public removeProduct(id:string):void
	{
		delete this.financialGoal.products[id];


		this.reset();
	}
}
