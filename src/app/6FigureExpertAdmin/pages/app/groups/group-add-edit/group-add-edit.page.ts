import {Component, OnInit} from '@angular/core';
import {BaseAddEditForm} from "../../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {FormBuilder, Validators} from "@angular/forms";
import {EnumField, EnumRoute, EnumType} from "../../../../../enums/Enums";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {VOGroup} from "../../../../../vo/VOGroup";


@Component({
	selector   : 'app-group-add-edit',
	templateUrl: './group-add-edit.page.html',
	styleUrls  : ['./group-add-edit.page.scss'],
})
export class GroupAddEditPage extends BaseAddEditForm implements OnInit
{
	public group:VOGroup;





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
		this.itemType = EnumType.Group;
		this.itemName = EnumType[EnumType.Group];


		this.group = this.route.snapshot.data[EnumField.GROUP_INFO];


		this.routeBackOnAdd = `${this.navController.root}/${EnumRoute.GROUPS}`;
		this.routeBackOnEdit = `${this.navController.root}/${EnumRoute.GROUPS}`;
		this.routeBackOnDelete = this.routeBackOnAdd;
		this.routeBack = this.group.auid ? this.routeBackOnEdit : this.routeBackOnAdd;


		this.title = this.group.auid ?
				   "Edit Group" : "New Group";


		this.formAddEdit = this.formBuilder.group({
			name       : [this.group.name, Validators.required],
			title      : [this.group.title, Validators.required],
			description: [this.group.description]
		});
	}





	onSubmit(value?:any):void
	{
		super.onSubmit(new VOGroup({...this.group, ...value}));
	}





	postAddItem(item:any):void
	{
		this.backendService.updateGroupHash(item.auid, item);
	}





	postEditItem(item:any):void
	{
		this.backendService.updateGroupHash(item.auid, item);
	}





	postDeleteItem(item:any):void
	{
		this.backendService.updateGroupHash(item.auid);
	}
}
