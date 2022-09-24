import {Component, OnInit} from '@angular/core';
import {BaseAddEditForm} from "../../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {FormBuilder, Validators} from "@angular/forms";
import {EnumField, EnumRoute, EnumType} from "../../../../../enums/Enums";
import {VOCategory} from "../../../../../vo/VOCategory";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";


@Component({
	selector   : 'app-category-add-edit',
	templateUrl: './category-add-edit.page.html',
	styleUrls  : ['./category-add-edit.page.scss'],
})
export class CategoryAddEditPage extends BaseAddEditForm implements OnInit
{
	public category:VOCategory;





	constructor(router:Router,
			  route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  alertService:ArrowAlertService,
			  loaderService:ArrowLoaderService,
			  backendService:BackendService,
			  formBuilder:FormBuilder)
	{
		super(router, route, navController, alertService, loaderService, backendService, formBuilder);
	}





	ngOnInit()
	{
		this.itemType = EnumType.Category;
		this.itemName = EnumType[EnumType.Category];


		this.category = this.route.snapshot.data[EnumField.CATEGORY_INFO];


		this.routeBackOnAdd = `${this.navController.root}/${EnumRoute.CATEGORIES}`;
		this.routeBackOnEdit = `${this.navController.root}/${EnumRoute.CATEGORIES}`;
		this.routeBackOnDelete = this.routeBackOnAdd;
		this.routeBack = this.category.auid ? this.routeBackOnEdit : this.routeBackOnAdd;


		this.title = this.category.auid ?
				   "Edit Category" : "New Category";


		this.formAddEdit = this.formBuilder.group({
			title      : [this.category.title, Validators.required],
			description: [this.category.description]
		});
	}





	onSubmit(value?:any):void
	{
		super.onSubmit(new VOCategory({...this.category, ...value}));
	}





	postAddItem(item:any):void
	{
		this.backendService.updateCategoryHash(item.auid, item);
	}





	postEditItem(item:any):void
	{
		this.backendService.updateCategoryHash(item.auid, item);
	}





	postDeleteItem(item:any):void
	{
		this.backendService.updateCategoryHash(item.auid);
	}
}
