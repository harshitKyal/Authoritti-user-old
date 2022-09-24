import {Component} from '@angular/core';
import {BaseList} from "../../../../../base/BaseList";
import {ArrowToastService} from "../../../../../Arrow/services/toast/arrow-toast.service";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EnumType} from "../../../../../enums/Enums";


@Component({
	selector   : 'app-category-list',
	templateUrl: './category-list.page.html',
	styleUrls  : ['./category-list.page.scss'],
})
export class CategoryListPage extends BaseList
{
	constructor(router:Router,
			  route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  alertService:ArrowAlertService,
			  loaderService:ArrowLoaderService,
			  backendService:BackendService,
			  toastService:ArrowToastService)
	{
		super(router, route, navController, alertService, loaderService, backendService, toastService);
	}





	ngOnInit()
	{
		super.ngOnInit();


		this.itemType = EnumType.Category;
	}





	deleteItem(item:any, handler?:Function):void
	{
		super.deleteItem(item, () => {

			this.backendService.updateCategoryHash(item.auid);
		});
	}
}
